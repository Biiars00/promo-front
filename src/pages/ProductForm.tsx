import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ProductFormFields } from '../components/ProductFormFields';
import { ICreateProduct } from '../types/products';
import { ProductService } from '../services/productService';

const initialFormData: ICreateProduct = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
};

export const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ICreateProduct>(initialFormData);
  const navigate = useNavigate();

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || formData.price <= 0 || formData.stock < 0) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    try {
      await ProductService.addProduct(formData);
      alert('Produto cadastrado com sucesso!');
      setFormData(initialFormData);
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Produto</h1>
      <ProductFormFields formData={formData} onChange={handleChange} />
      <div className="mt-6 flex gap-2">
        <Button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Cadastrar
        </Button>
        <Button onClick={() => navigate('/produtos')} className="bg-gray-300 text-black px-4 py-2 rounded">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
