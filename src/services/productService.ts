import { ICheckStock, ICreateProduct, IUpdateProduct } from "../types/products";
import api from "./api";

export const ProductService = {
  async addProduct(data: ICreateProduct) {
    const response = await api.post('/products', data);
    return response.data;
  },

  async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    hasDiscount?: boolean;
    sortBy?: 'name' | 'price' | 'created_at' | 'stock';
    sortOrder?: 'asc' | 'desc';
    includeDeleted?: boolean;
    onlyOutOfStock?: boolean;
    withCouponApplied?: boolean;
  }) {
    const response = await api.get('/products', { params });
    console.log(response.data)
    return response.data || [];
  },

  async getProductById(id: number) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async updateProduct(id: number, data: IUpdateProduct) {
    const response = await api.patch(`/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: number, body: ICheckStock) {
    const response = await api.delete(`/products/${id}`, { data: body });
    return response.data;
  },

  async restoreProduct(id: number, body: ICheckStock) {
    const response = await api.post(`/products/${id}/restore`, body);
    return response.data;
  },

  async applyDiscount(id: number, couponId: number) {
    return api.post(`/products/${id}/discount`, couponId).then(res => res.data);
  }
};