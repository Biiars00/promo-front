import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { fetchProducts, deleteProduct, addProduct, updateProduct, applyDiscount } from './productThunks';
import { fetchProducts, addProduct, updateProduct, applyDiscount } from './productThunks';
import { IProductItem } from '../../types/products';

interface ProductState {
  list: IProductItem[];
}

const initialState: ProductState = {
  list: []
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ data: IProductItem[] }>) => {
        state.list = action.payload.data;
      })
      // .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
      //   state.list = state.list.filter((product: { id: { toString: () => string; }; }) => product.id.toString() !== action.payload);
      // })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<IProductItem>) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<IProductItem>) => {
        const index = state.list.findIndex((p: { id: number; }) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(applyDiscount.fulfilled, (state, action: PayloadAction<IProductItem>) => {
        const index = state.list.findIndex((p: { id: number; }) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export default productSlice.reducer;