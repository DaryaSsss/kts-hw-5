import { ILocalStore } from '@utils/helpers';
import axios from 'axios';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';

import { IFetchProducts, Meta, normalizeProduct, ProductModel } from './models/Product';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export default class RelatedProductsStore implements ILocalStore {
  constructor() {
    makeAutoObservable(this, { products: observable.ref });
  }

  products: ProductModel[] = [];
  meta: Meta = Meta.initial;

  /////////// COMPUTED /////////////

  /////////// METHODS //////////////

  /////////// ACTIONS //////////////

  fetchRelatedProducts = async (args?: IFetchProducts) => {
    this.meta = Meta.loading;

    const result = await axios({
      method: 'get',
      url: `${BASE_URL}/products`,
      params: {
        offset: args?.offset,
        limit: args?.limit,
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

  destroy(): void {
    // nothing to do
  }
}
