import React, { useState } from 'react';
import { ProductService } from '../services/productService';
import { IProductItem } from '../types/products';
import { Button } from '../components/Button';

interface Props {
  open: boolean;
  product: IProductItem | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const InactiveOrReactiveProductModal: React.FC<Props> = ({
  open,
  product,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!open || !product) return null;

  const isInactive = product.isOutOfStock;

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      if (isInactive) {
        await ProductService.restoreProduct(product.id, { isOutOfStock: false });
      } else {
        await ProductService.deleteProduct(product.id, { isOutOfStock: true });
      }
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao alterar status do produto:', error);
      alert('Erro ao alterar status do produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isInactive ? 'Reativar Produto' : 'Inativar Produto'}
        </h2>
        <p className="mb-6">
          Tem certeza que deseja {isInactive ? 'reativar' : 'inativar'} o produto{' '}
          <strong>"{product.name}"</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} disabled={loading} className="bg-gray-200 text-black hover:bg-gray-300">
            Cancelar
          </Button>
          <Button
            onClick={handleToggleStatus}
            disabled={loading}
            className={isInactive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {loading ? 'Processando...' : isInactive ? 'Reativar' : 'Inativar'}
          </Button>
        </div>
      </div>
    </div>
  );
};
