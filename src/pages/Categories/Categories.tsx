import { useEffect } from 'react';
import React from 'react';

import { Card } from '@components/Card';
import { Loader, LoaderSize } from '@components/Loader';
import gridStyles from '@pages/Products/Products.module.scss';
import categoriesStore from '@store/CategoriesStore';
import { Category } from '@store/models/Category';
import { Meta } from '@store/models/Product';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import styles from './Categories.module.scss';

const Categories = observer(() => {
  const navigate = useNavigate();

  const { categories, fetchCategories, meta } = categoriesStore;

  useEffect(() => {
    fetchCategories();

    window.scrollTo({
      top: 0,
      left: 0
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.header__title}>Categories</h1>
        </div>
        {meta === Meta.loading ? (
          <Loader size={LoaderSize.l} />
        ) : meta === Meta.success ? (
          <div className={gridStyles.grid}>
            {categories.map((category: Category) => (
              <Card
                title={category.name}
                image={category.image}
                onClick={() => navigate(`/products?categoryId=${category.id}`)}
                key={category.id}
              />
            ))}
          </div>
        ) : (
          <span>No categories</span>
        )}
      </div>
    </div>
  );
});

export default Categories;
