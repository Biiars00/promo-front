import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductService } from '../../services/productService';
import { ICreateProduct, IProductItem } from '../../types/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const response = await ProductService.getProducts();
    return response; 
  }
);

// export const deleteProduct = createAsyncThunk(
//   'products/delete',
//   async ({ id, isOutOfStock }: { id: string; stock: number }) => {
//     await ProductService.deleteProduct(Number(id), { isOutOfStock });
//     return id;
//   }
// );

export const addProduct = createAsyncThunk(
  'products/add',
  async (product: ICreateProduct) => {
    const response = await ProductService.addProduct(product);
    return response as IProductItem;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product: IProductItem) => {
    await ProductService.updateProduct(product.id, product);
    return product;
  }
);

export const applyDiscount = createAsyncThunk(
  'products/discount',
  async ({
    id,
    couponId
  }: {
    id: number;
    couponId: number;
  }) => {
    const response = await ProductService.applyDiscount(Number(id), couponId);
    return response;
  }
);