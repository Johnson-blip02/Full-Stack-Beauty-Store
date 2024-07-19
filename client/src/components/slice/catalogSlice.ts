import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../Data/product";
import agent from "../../router/api/agent";
import { RootState } from "../../util/configureStore";
import { MetaData } from "../../Data/pagination";

const productsAdapter = createEntityAdapter<Product>();

export interface CatalogState {
  // Ensure this is exported
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  category: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();
  params.append("pageNum", productParams.pageNum.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy.toString());
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.category)
    params.append("category", productParams.category.toString());
  if (productParams.brands)
    params.append("brands", productParams.brands.toString());
  return params;
}

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
  try {
    const response = await agent.Catalog.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

// export const fetchProductsAsync = createAsyncThunk<
//   Product[], // Return type of the payload creator
//   void, // First argument type of the payload creator, if any (void if none)
//   { state: RootState }
//   // { rejectValue: string } // Additional thunkAPI properties like rejectValue
// >("catalog/fetchProductsAsync", async (_, thunkAPI) => {
//   const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
//   try {
//     const response = await agent.Catalog.list(params);
//     thunkAPI.dispatch(setMetaData(response.metaData));
//     return response.items;
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.rejectWithValue("Failed to fetch products");
//   }
// });

export const fetchProductAsync = createAsyncThunk<
  Product, // Return type of the payload creator
  number, // First argument type of the payload creator
  { rejectValue: string } // Additional thunkAPI properties like rejectValue
>("catalog/fetchProductAsync", async (productId, thunkAPI) => {
  try {
    return await agent.Catalog.details(productId);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to fetch product details");
  }
});

interface Filters {
  brands: string[];
  category: string[];
}

export const fetchFilters = createAsyncThunk<
  Filters, // Return type of the payload creator
  void, // First argument type of the payload creator, if any (void if none)
  { rejectValue: string } // Additional thunkAPI properties like rejectValue
>("catalog/fetchFilters", async (_, thunkAPI) => {
  try {
    const filters = await agent.Catalog.fetchFilters();
    return filters;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to fetch filters");
  }
});

function initialParams() {
  return {
    pageNum: 1,
    pageSize: 6,
    orderBy: "name",
  };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [] as string[],
    category: [] as string[],
    productParams: initialParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initialParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.category = action.payload.category;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      (state.status = "idle"), console.log(action.payload);
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
export const { setProductParams, resetProductParams, setMetaData } =
  catalogSlice.actions;
