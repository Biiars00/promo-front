import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { ProductForm } from './pages/ProductForm';
import { ProductEdit } from './pages/ProductEdit';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/produtos" />} />
        <Route path="/produtos" element={<ProductList />} />
        <Route path="/produtos/novo" element={<ProductForm />} />
        <Route path="/produtos/editar/:id" element={<ProductEdit />} />
      </Routes>
    </Router>
  );
};

export default App;