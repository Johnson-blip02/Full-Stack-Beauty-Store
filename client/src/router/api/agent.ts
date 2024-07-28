import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../Route";
import { PaginatedResponse } from "../../Data/pagination";
import { store } from "../../util/configureStore";

// Set axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  //Make sure Bearer has a space only between token
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

// Axios response interceptor
axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title || "Bad Request");
        break;
      case 401:
        toast.error(data.title || "Unauthorized");
        break;
      case 404:
        toast.error(data.title || "Not Found");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        toast.error(data.title || "An unexpected error occurred");
        break;
    }
    return Promise.reject(error.response);
  }
);

// Request methods
const request = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

// API endpoints
const Catalog = {
  list: (params: URLSearchParams) => request.get("products", params),
  details: (id: number) => request.get(`products/${id}`),
  fetchFilters: () => request.get("products/filters"),
};

const TestErrors = {
  get400Error: () => request.get("buggy/bad-request"),
  get401Error: () => request.get("buggy/unauthorised"),
  get404Error: () => request.get("buggy/not-found"),
  get500Error: () => request.get("buggy/server-error"),
  getValidationError: () => request.get("buggy/validation-error"),
};

const Account = {
  login: (values: any) => request.post("account/login", values),
  register: (values: any) => request.post("account/register", values),
  currentUser: () => request.get("account/currentUser"),
};

const Cart = {
  get: () => request.get("cart"),
  addItem: (productId: number, quantity = 1) =>
    request.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    request.delete(`cart?productId=${productId}&quantity=${quantity}`),
};

const Orders = {
  list: () => request.get("orders"),
  fetch: (id: number) => request.get(`orders.id${id}`),
  create: (values: any) => request.post("orders", values),
};

// Exporting the agent
const agent = {
  Catalog,
  TestErrors,
  Cart,
  Account,
  Orders,
};

export default agent;
