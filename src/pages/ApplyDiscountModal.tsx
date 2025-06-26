import React, { useState, useEffect } from 'react';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { IProductItem } from '../types/products';

type Props = {
  open: boolean;
  onClose: () => void;
  product: IProductItem | null;
};

export const ApplyDiscountModal: React.FC<Props> = ({ open, onClose, product }) => {
  const [couponId, setCouponId] = useState<number | null>(null);

  useEffect(() => {
    setCouponId(null);
  }, [product]);

  if (!product) return null;

  const handleSubmit = () => {
    if (!couponId) return;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Aplicar Desconto</h2>

      <div className="mt-4">
        <Input
          label="ID do Cupom"
          type="number"
          value={couponId ?? ''}
          onChange={(e) => setCouponId(Number(e.target.value))}
        />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Aplicar</Button>
      </div>
    </Modal>
  );
};