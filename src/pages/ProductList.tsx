import React, { useEffect, useState } from 'react';
import { Pencil, DollarSign, ChevronLeft, ChevronRight, Trash2, Activity, Trash, Trash2Icon, OptionIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplyDiscountModal } from './ApplyDiscountModal';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { IProductItem } from '../types/products';
import { ProductService } from '../services/productService';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { InactiveOrReactiveProductModal } from './InactiveOrReactiveProductModal';
import { Sidebar } from '../components/Sidebar';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<IProductItem[]>([]);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProductItem | null>(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [hasDiscount, setHasDiscount] = useState(false);
  const [onlyOutOfStock, setOnlyOutOfStock] = useState(false);
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [withCouponApplied, setWithCouponApplied] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'created_at' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getProducts({
        page: currentPage,
        minPrice,
        maxPrice,
        search: searchTerm,
        hasDiscount,
        onlyOutOfStock,
        includeDeleted,
        withCouponApplied,
        sortBy,
        sortOrder,
      });

      setProducts(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (err) {
      console.error('Erro ao buscar produtos', err);
    }
  };

  const openDiscountModal = (product: IProductItem) => {
    setSelectedProduct(product);
    setDiscountModalOpen(true);
  };

  const openDetailsModal = (product: IProductItem) => {
    setSelectedProduct(product);
    setDetailsModalOpen(true);
  };

  const openToggleModal = (product: IProductItem) => {
    setSelectedProduct(product);
    setToggleModalOpen(true);
  };

  const visibleList = products.filter((product) => {
    const price = Number(product.price);
    const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return price >= minPrice && price <= maxPrice && matchesName;
  });

  return (
    <div className="flex bg-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Produtos</h1>

        <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <h2 className="text-lg font-semibold">Filtros</h2>

        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium">Preço mínimo</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-32 px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium">Preço máximo</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-32 px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 font-medium">Buscar por nome</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Shampoo"
              className="w-[300px] px-2 py-1 border rounded text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={(e) => setHasDiscount(e.target.checked)}
            />
            Com desconto
          </label>

          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={onlyOutOfStock}
              onChange={(e) => setOnlyOutOfStock(e.target.checked)}
            />
            Somente esgotados
          </label>

          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={withCouponApplied}
              onChange={(e) => setWithCouponApplied(e.target.checked)}
            />
            Com cupom aplicado
          </label>

          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={includeDeleted}
              onChange={(e) => setIncludeDeleted(e.target.checked)}
            />
            Inativos (deletados)
          </label>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 border rounded text-sm"
            >
              <option value="name">Nome</option>
              <option value="price">Preço</option>
              <option value="stock">Estoque</option>
            </select>
          </div>

          <div className='flex items-center justify-around'>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium">Ordem</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="asc">Crescente</option>
                <option value="desc">Decrescente</option>
              </select>
            </div>

            <Button
              onClick={fetchProducts}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mt-5"
            >
              Aplicar Filtros
            </Button>
          </div>

          <div>
            <Button
              onClick={() => navigate('/produtos/novo')}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              + Criar Produto
            </Button>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-3">Nome</th>
            <th className="px-3">Descrição</th>
            <th className="px-3">Preço</th>
            <th className="px-3">Estoque</th>
            <th className="px-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {visibleList.map((product) => {
            const hasDiscount = !!product.activeCoupon;
            const finalPrice = hasDiscount ? product.activeCoupon.finalPrice : product.price;
            const discountInfo = hasDiscount ? product.activeCoupon.discount : null;

            return (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName !== 'BUTTON' && !(e.target as HTMLElement).closest('button')) {
                    openDetailsModal(product);
                  }
                }}
              >
                <td className="py-2 px-3 font-medium flex items-center gap-2">
                  {product.name}
                  {product.isOutOfStock && (
                    <span className="text-xs text-red-600 border border-red-600 px-1 rounded">Esgotado</span>
                  )}
                </td>
                <td className="px-3">{product.description}</td>
                <td className="px-3">
                  {hasDiscount ? (
                    <div>
                      <s className="text-sm text-gray-500">R$ {Number(product.price).toFixed(2)}</s>
                      <span className="ml-1 text-xs text-green-600 font-bold">
                        {discountInfo?.type === 'percent'
                          ? `${discountInfo.value}%`
                          : 'Cupom'}
                      </span>
                      <div className="font-bold">R$ {finalPrice.toFixed(2)}</div>
                    </div>
                  ) : (
                    <span className="font-bold">R$ {Number(product.price).toFixed(2)}</span>
                  )}
                </td>
                <td className="px-3">{product.stock}</td>
                <td className="px-3">
                  <div className="flex gap-2">
                    <Button onClick={() => navigate(`/produtos/editar/${product.id}`)}>
                      <Pencil size={16} />
                    </Button>
                    <Button onClick={() => openDiscountModal(product)}>
                      <DollarSign size={16} />
                    </Button>
                    <Button onClick={() => openToggleModal(product)}>
                      <Trash2Icon size={16} /> 
                      {product.isOutOfStock ? <Trash2Icon size={16} />  : 'Reativa'}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-6 gap-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
        >
          <ChevronLeft size={16} />
        </Button>
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      <ApplyDiscountModal
        open={discountModalOpen}
        onClose={() => setDiscountModalOpen(false)}
        product={selectedProduct}
      />

      <ProductDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        product={selectedProduct}
      />

      <InactiveOrReactiveProductModal
        open={toggleModalOpen}
        product={selectedProduct}
        onClose={() => setToggleModalOpen(false)}
        onSuccess={fetchProducts}
      />
      </main>
    </div>
  );
};

