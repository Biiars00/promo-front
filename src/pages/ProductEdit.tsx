import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ProductService } from '../services/productService';
import { IProduct, IProductById, IProductItem, IUpdateProduct } from '../types/products';

export const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IUpdateProduct>({ price: 0, stock: 0 });
  const [productInfo, setProductInfo] = useState<{ name: string; description?: string }>({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const product: IProductById = await ProductService.getProductById(Number(id));

        setProductInfo({
            name: product.data.name,
            description: product.data.description,
        });
        setFormData({
            price: product.data.price,
            stock: product.data.stock,
        });
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!id) return;

    if ((formData.price ?? 0) <= 0 || (formData.stock ?? 0) < 0) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    try {
      await ProductService.updateProduct(Number(id), formData);
      navigate('/produtos');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar o produto.');
    }
  };

  if (loading) return <p className="p-6">Carregando produto...</p>;
  if (notFound) return <p className="p-6">Produto não encontrado.</p>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-900">
          {productInfo.name || 'Produto sem nome'}
        </p>
        {productInfo.description ? (
          <p className="text-sm text-gray-600 mt-1">{productInfo.description}</p>
        ) : (
          <p className="text-sm text-gray-400 mt-1">Sem descrição</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            className="w-full border px-3 py-2 rounded shadow-sm focus:ring focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={(e) => handleChange('stock', Number(e.target.value))}
            className="w-full border px-3 py-2 rounded shadow-sm focus:ring focus:ring-black"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSubmit}>Salvar</Button>
        <Button onClick={() => navigate('/produtos')} >Cancelar</Button>
      </div>
    </div>
  );
};
