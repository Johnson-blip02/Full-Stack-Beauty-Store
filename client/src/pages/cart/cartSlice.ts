import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../Data/cart";
import agent from "../../router/api/agent";

export interface CartState {
  cart: Cart | null;
  status: string;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
};

export const addCartItemAsync = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number },
  { rejectValue: string }
>("cart/addCartItemAsync", async ({ productId, quantity = 1 }, thunkAPI) => {
  try {
    const cart = await agent.Cart.addItem(productId, quantity);
    return cart;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to add item to cart");
  }
});

export const removeCartItemAsync = createAsyncThunk<
  Cart,
  { productId: number; quantity: number; name?: string },
  { rejectValue: string }
>("cart/removeCartItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Cart.removeItem(productId, quantity);
    // Assuming you fetch the updated cart after removal
    const cart = await agent.Cart.get(); // Fetch updated cart after removal
    return cart;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to remove item from cart");
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart | null>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addCartItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(removeCartItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemPosition = state.cart?.items.findIndex(
        (p) => p.productId === productId
      );
      if (itemPosition === -1 || itemPosition === undefined) return;
      state.cart!.items[itemPosition].quantity -= quantity;
      if (state.cart?.items[itemPosition].quantity === 0)
        state.cart.items.splice(itemPosition, 1);
      state.status = "idle";
    });
    builder.addCase(removeCartItemAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
