import { ILocalStore } from '@utils/helpers';
import axios from 'axios';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';

import { IFetchProducts, Meta, normalizeProduct, ProductModel } from './models/Product';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export default class ProductsStore implements ILocalStore {
  constructor() {
    makeAutoObservable(this, { products: observable.ref });
  }

  products: ProductModel[] = [];
  meta: Meta = Meta.initial;
  productsCount: number = 0;

  /////////// COMPUTED /////////////

  /////////// METHODS //////////////

  /////////// ACTIONS //////////////

  fetchAllProducts = async (args?: IFetchProducts) => {
    this.meta = Meta.loading;

    const result = await axios({
      method: 'get',
      url: `${BASE_URL}/products`,
      params: {
        title: args?.title,
        categoryId: args?.categoryId
      }
    });

    runInAction(() => {
      if (result.status === 200) {
        this.meta = Meta.success;
        this.setProductsCount(result.data.length);
        return;
      }

      this.meta = Meta.error;
    });
  };

  fetchCurrentProducts = async (args?: IFetchProducts) => {
    this.meta = Meta.loading;

    const result = await axios({
      method: 'get',
      url: `${BASE_URL}/products`,
      params: {
        offset: args?.offset,
        limit: args?.limit,
        title: args?.title,
        categoryId: args?.categoryId
      }
    });

    runInAction(() => {
      if (result.status === 200) {
        this.meta = Meta.success;
        this.setProducts(result.data.map(normalizeProduct));

        return;
      }

      this.meta = Meta.error;
    });
  };

  setProducts = (products: ProductModel[]) => {
    this.products = products;
  };

  setProductsCount = (productsCount: number) => {
    this.productsCount = productsCount;
  };

  destroy(): void {
    // nothing to do
  }
}
