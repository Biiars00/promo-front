import React from 'react';
import { Dialog } from '@headlessui/react';
import { IProductItem } from '../types/products';
import { Button } from '../components/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  product: IProductItem | null;
}

export const ProductDetailsModal: React.FC<Props> = ({ open, onClose, product }) => {
  if (!product) return null;

  const { name, description, price, stock, createdAt, isOutOfStock, activeCoupon } = product;

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="bg-white p-6 rounded-lg z-50 w-full max-w-md shadow-lg">
        <Dialog.Title className="text-lg font-bold mb-4">Detalhes do Produto</Dialog.Title>
        <div className="space-y-2">
          <p><strong>Nome:</strong> {name}</p>
          <p><strong>Descrição:</strong> {description || 'Sem descrição'}</p>
          <p><strong>Preço:</strong> R$ {Number(price).toFixed(2)}</p>
          {activeCoupon && (
            <p>
              <strong>Com desconto:</strong> R$ {Number(activeCoupon.finalPrice).toFixed(2)} (
              {activeCoupon.discount.type === 'percent' ? `${activeCoupon.discount.value}%` : 'Cupom'})
            </p>
          )}
          <p><strong>Estoque:</strong> {stock} {isOutOfStock && '(Esgotado)'}</p>
          <p><strong>Criado em:</strong> {createdAt}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="text-sm bg-gray-100 hover:bg-gray-200">Fechar</Button>
        </div>
      </div>
    </Dialog>
  );
};
