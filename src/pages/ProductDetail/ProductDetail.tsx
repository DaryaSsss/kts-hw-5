import { useEffect, useMemo } from 'react';
import React from 'react';

import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Loader, LoaderSize } from '@components/Loader';
import gridStyles from '@pages/Products/Products.module.scss';
import cartStore from '@store/CartStore';
import { Meta, ProductModel } from '@store/models/Product';
import RelatedProductsStore from '@store/RelatedProductsStore';
import SingleProductStore from '@store/SingleProductStore';
import { useCountRelatedProducts, useLocalStore } from '@utils/helpers';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Swiper.scss';

import styles from './ProductDetail.module.scss';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

const ProductDetail = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const count = useCountRelatedProducts('(max-width: 1024px)');

  const singleProductStore = useLocalStore(() => new SingleProductStore());
  const { product, fetchSingleProduct, meta } = singleProductStore;

  const relatedProductsStore = useLocalStore(() => new RelatedProductsStore());
  const {
    products: relatedProducts,
    fetchRelatedProducts,
    meta: relatedProductsMeta
  } = relatedProductsStore;

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchSingleProduct(+id!);
  }, [id]);

  useEffect(() => {
    if (product?.categoryId) {
      fetchRelatedProducts(
        {
          limit: count,
          offset: 0,
          categoryId: product.categoryId
        },
        product.id
      );
    }
  }, [product?.categoryId, product?.id]);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.card}>
          {meta === Meta.loading ? (
            <Loader size={LoaderSize.l} className={styles.noProduct} />
          ) : meta === Meta.success && product ? (
            <>
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                className="swiper"
                navigation={true}
                modules={[Navigation, Thumbs]}>
                {product.images.map((image: string) => (
                  <SwiperSlide key={image}>
                    <img src={image} alt="Product" className={styles.card_image} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={styles.description}>
                <h1 className={styles.description_title}>{product.title}</h1>
                <p className={styles.description_subtitle}>{product.subtitle}</p>
                <p className={styles.description_content}>${product.content}</p>
                <div className={styles.description_buttons}>
                  <Button
                    className={styles.description_buttons_button}
                    onClick={() => cartStore.deleteFromCart(product)}
                    disabled={!cartStore.cartProducts.some((p) => p.id === product.id)}>
                    Remove from Cart
                  </Button>
                  <Button
                    className={styles.description_buttons_button}
                    color="white"
                    onClick={() => cartStore.addProductToCart(product)}
                    disabled={cartStore.cartProducts.some((p) => p.id === product.id)}>
                    {cartStore.cartProducts.includes(product) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <span>No product</span>
          )}
        </div>
        {relatedProductsMeta === Meta.loading ? (
          <Loader size={LoaderSize.l} className={styles.noProduct} />
        ) : (
          relatedProductsMeta === Meta.success && (
            <>
              <h2 className={styles.relatedTitle}>Related Items</h2>
              <div className={gridStyles.grid}>
                {relatedProducts.map((item: ProductModel) => (
                  // item.id !== product?.id && (
                  <Card
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.images[0]}
                    content={item.content}
                    category={item.category}
                    onClick={() => navigate(`/products/${item.id}`)}
                    key={item.id}
                  />
                ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
});

export default ProductDetail;
