export interface IDiscount {
  finalPrice: number;
  discount: {
    type: 'percent' | 'coupon';
    value: number;
    appliedAt: string;
  }
}

export interface IProductItem {
  id: number,
  name: string,
  description?: string,
  stock: number,
  price: number,
  createdAt: string,
  updatedAt?: string | null,
  isOutOfStock: false,
  activeCoupon: IDiscount
}

export interface IProduct {
  data: [
    {
      id: number,
      name: string,
      description?: string,
      stock: number,
      price: number,
      createdAt: string,
      updatedAt?: string | null,
      isOutOfStock: false,
      activeCoupon: IDiscount | null
    },
  ],
  meta: {
    page: number,
    limit: number,
    totalItems: number,
    totalPages: number,
  }
}

export interface IProductById {
  data: {
    id: number,
    name: string,
    description?: string,
    stock: number,
    price: number,
    createdAt: string,
    updatedAt?: string | null,
    isOutOfStock: false,
    activeCoupon: IDiscount | null
  },
}

export interface ICreateProduct {
  name: string;
  description?: string;
  stock: number;
  price: number;
}

export interface IUpdateProduct {
  stock?: number;
  price?: number;
}

export interface ICheckStock {
  isOutOfStock: boolean;
}
