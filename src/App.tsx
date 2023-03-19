import React from 'react';

// import { Header } from '@components/Header';
// import { About } from '@pages/About';
// import { Categories } from '@pages/Categories';
// import { ProductDetail } from '@pages/ProductDetail';
// import { Products } from '@pages/Products';
// import { useCountProducts } from '@utils/helpers';
import './styles/styles.scss';
import { Header } from '@components/Header';
import { About } from '@pages/About';
import { Categories } from '@pages/Categories';
import { ProductDetail } from '@pages/ProductDetail';
import { Products } from '@pages/Products';
import { useCountProducts } from '@utils/helpers';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import { Header } from '../src/components/Header';

function App() {
  const count = useCountProducts('(max-width: 1024px)');

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/products" element={<Products itemsPerPage={count} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
