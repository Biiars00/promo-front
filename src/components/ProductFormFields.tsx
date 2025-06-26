import React from 'react';
import { Input } from './Input';

type Props = {
  formData: any;
  onChange: (name: string, value: string | number) => void;
};

export const ProductFormFields: React.FC<Props> = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
       <Input
        label="Nome do produto"
        classNameLabel='text-sm font-medium'
        name="name"
        value={formData.name}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        classNameInput="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-black"
        required
      />

      <div className="col-span-2">
        <label className="text-sm font-medium">Descrição</label>
        <textarea
          name="description"
          placeholder="Descrição detalhada do produto"
          value={formData.description || ''}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-gray-800"
        />
      </div>

      <Input
        label="Preço"
        classNameLabel='text-sm font-medium'
        name="price"
        type="number"
        value={formData.price}
        onChange={(e) => onChange(e.target.name, Number(e.target.value))}
        classNameInput="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-black"
        required
      />

      <Input
        label="Estoque"
        classNameLabel='text-sm font-medium'
        name="stock"
        type="number"
        value={formData.stock}
        onChange={(e) => onChange(e.target.name, Number(e.target.value))}
        classNameInput="border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-black"
        required
      />
    </div>
  );
};