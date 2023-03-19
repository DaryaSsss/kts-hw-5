import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';

import { Button } from '@components/Button/Button';
import { Card } from '@components/Card/Card';
import { Input } from '@components/Input/Input';
import { Loader, LoaderSize } from '@components/Loader/Loader';
import { Select } from '@components/Select';
import { SelectOption } from '@components/Select/Select';
import arrow from '@img/arrow-pagination.svg';
import search from '@img/search-normal.svg';
import categoriesStore from '@store/CategoriesStore';
import { Meta } from '@store/models/Product';
import ProductsStore from '@store/ProductsStore';
import { getNumberFromQuery, getPageFromQuery, useLocalStore } from '@utils/helpers';
import { observer } from 'mobx-react-lite';
import ReactPaginate from 'react-paginate';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Products.module.scss';

export const Products = observer(({ itemsPerPage }: { itemsPerPage: number }) => {
  const productStore = useLocalStore(() => new ProductsStore());
  const { products, fetchAllProducts, fetchCurrentProducts, productsCount, meta } = productStore;

  const { categories, fetchCategories, meta: categoriesMeta } = categoriesStore;

  const navigate = useNavigate();
  const productsRef = useRef(null);

  const pageCount = Math.ceil(productsCount / itemsPerPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('search') || '');

  const [chosenCategory, setChosenCategory] = useState<SelectOption['key']>(
    getNumberFromQuery(searchParams.get('categoryId'), -1)
  );

  const queryParams = useMemo(() => {
    const page = searchParams.get('page');
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    return {
      page: getPageFromQuery(page),
      search,
      categoryId: category && !isNaN(+category) ? +category : undefined
    };
  }, [searchParams]);

  const skip = queryParams.page * itemsPerPage;

  const handlePageClick = (event: any, ref: any) => {
    searchParams.set('page', (event.selected + 1).toString());
    setSearchParams(searchParams);

    window.scrollTo({
      top: ref.offsetTop,
      left: 0
    });
  };

  const handleSearch = () => {
    if (searchValue === '') {
      searchParams.delete('search');
    } else {
      searchParams.set('search', searchValue);
    }

    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (chosenCategory && chosenCategory !== -1) {
      searchParams.set('categoryId', chosenCategory.toString());
    } else {
      searchParams.delete('categoryId');
    }

    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [chosenCategory]);

  useEffect(() => {
    fetchAllProducts({
      title: queryParams.search || undefined,
      categoryId: chosenCategory === -1 ? undefined : chosenCategory
    });
  }, [queryParams.search, chosenCategory]);

  useEffect(() => {
    fetchCurrentProducts({
      title: queryParams.search || undefined,
      offset: skip,
      limit: itemsPerPage,
      categoryId: chosenCategory === -1 ? undefined : chosenCategory
    });
  }, [queryParams.search, queryParams.page, chosenCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>
            We display products based on the latest products we have, if you want to see our old
            products please enter the name of the item
          </p>
        </div>
        <div className={styles.filter} ref={productsRef}>
          <div className={styles.searchWrapper}>
            <img src={search} alt="search icon" className={styles.input__icon} />
            <Input
              value={searchValue}
              placeholder="Search property"
              onChange={setSearchValue}
              className={styles.input}
            />
            <Button className={styles.input__button} onClick={handleSearch}>
              Find Now
            </Button>
          </div>
          <Select
            options={categories.map((category) => ({
              key: category.id,
              value: category.name
            }))}
            value={chosenCategory}
            disabled={categoriesMeta === Meta.loading || categoriesMeta === Meta.error}
            onChange={(option) => setChosenCategory(option.key)}
          />
        </div>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>Total Product</h2>
          <span className={styles.numberOfProducts}>{productsCount}</span>
        </div>
        {meta === Meta.loading ? (
          <div className={styles.loader}>
            <Loader size={LoaderSize.l} />
          </div>
        ) : products.length > 0 ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <Card
                title={product.title}
                subtitle={product.subtitle}
                image={product.images[0]}
                content={product.content}
                category={product.category}
                onClick={() => navigate(`/products/${product.id}`)}
                key={product.id}
              />
            ))}
          </div>
        ) : (
          <span>No products</span>
        )}
        <ReactPaginate
          breakLabel="..."
          onPageChange={(event) => handlePageClick(event, productsRef.current)}
          forcePage={queryParams.page}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          renderOnZeroPageCount={() => null}
          className={styles.pagination}
          previousLabel={<img src={arrow} alt="previous" className={styles.arrow} />}
          nextLabel={<img src={arrow} alt="next" className={(styles.arrow, styles.arrowRight)} />}
          pageLinkClassName={styles.paginationPage}
          activeLinkClassName={styles.paginationPage_active}
          previousClassName={styles.paginationPage_move}
          nextClassName={styles.paginationPage_move}
          previousLinkClassName={styles.link}
          nextLinkClassName={styles.link}
          breakClassName={styles.break}
          disabledClassName={styles.disabled}
        />
      </div>
    </div>
  );
});
