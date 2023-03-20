import React from 'react';

import '@styles/styles.scss';
import { Header } from '@components/Header';
import { About } from '@pages/About';
import { Cart } from '@pages/Cart';
import { Categories } from '@pages/Categories';
import { ProductDetail } from '@pages/ProductDetail';
import { Products } from '@pages/Products';
import { useCountProducts } from '@utils/helpers';
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';

function App() {
  const count = useCountProducts('(max-width: 1024px)');

  return (
    <HashRouter basename="/kts-hw-5">
      <Header />
      <Routes>
        <Route path="/products" element={<Products itemsPerPage={count} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
