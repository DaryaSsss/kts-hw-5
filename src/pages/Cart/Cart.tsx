import React from 'react';

import { Card } from '@components/Card';
import gridStyles from '@pages/Products/Products.module.scss';
import cartStore from '@store/CartStore';
import { ProductModel } from '@store/models/Product';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './Cart.module.scss';

const Cart = observer(() => {
  const { cartProducts, deleteFromCart } = cartStore;

  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.header__title}>
            My products
            {cartProducts.length > 0 &&
              `: $${cartProducts.reduce((acc, product) => acc + +product.content, 0)}`}
          </h1>
        </div>
        {cartProducts.length > 0 ? (
          <div className={gridStyles.grid}>
            {cartProducts.map((product: ProductModel) => (
              <Card
                title={product.title}
                image={product.images[0]}
                subtitle={product.subtitle}
                category={product.category}
                content={product.content}
                onClick={() => navigate(`/products/${product.id}`)}
                key={product.id}
              />
            ))}
          </div>
        ) : (
          <span className={styles.noProduct}>You have not added any items to your cart yet</span>
        )}
      </div>
    </div>
  );
});

export default Cart;
