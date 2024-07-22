import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  SerializedError,
} from "@reduxjs/toolkit";
import { User } from "../../Data/user";
import { FieldValues } from "react-hook-form";
import agent from "../../router/api/agent";
import { router } from "../../router/Route";
import { toast } from "react-toastify";
import { setCart } from "../../pages/cart/cartSlice";

export interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<
  User,
  FieldValues,
  { rejectValue: SerializedError }
>("account/signInUser", async (data, thunkAPI) => {
  try {
    const userDto = await agent.Account.login(data);
    const { cart, ...user } = userDto;
    if (cart) thunkAPI.dispatch(setCart(cart));
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    // If the error is a string, wrap it in a SerializedError object
    return thunkAPI.rejectWithValue({
      message: "Failed to sign in",
      // Optionally include any other fields relevant to the error
      // For example, if `error` has more information, you can spread it here
    });
  }
});

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: SerializedError }
>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.currentUser();
      const { cart, ...user } = userDto;
      if (cart) thunkAPI.dispatch(setCart(cart));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      // If the error is a string, wrap it in a SerializedError object
      return thunkAPI.rejectWithValue({
        message: "Failed to fetch current user",
        // Optionally include any other fields relevant to the error
        // For example, if `error` has more information, you can spread it here
      });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      //Nagivates them back to home page
      router.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Session expired");
      router.navigate("/");
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (_state, action) => {
      throw action.payload;
    });
  },
});

export const { signOut, setUser } = accountSlice.actions;
