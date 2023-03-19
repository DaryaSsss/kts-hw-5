import { BASE_URL } from '@config/API';
import { ILocalStore } from '@utils/helpers';
import axios from 'axios';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import { IFetchProducts, Meta, normalizeProduct, ProductModel } from './models/Product';

export default class RelatedProductsStore implements ILocalStore {
  constructor() {
    makeAutoObservable(this, { products: observable.ref });
  }

  products: ProductModel[] = [];
  meta: Meta = Meta.initial;

  /////////// COMPUTED /////////////
  /////////// METHODS //////////////

  /////////// ACTIONS //////////////
  fetchRelatedProducts = async (args?: IFetchProducts, id?: number) => {
    this.meta = Meta.loading;

    const result = await axios({
      method: 'get',
      url: `${BASE_URL}/products`,
      params: {
        offset: args?.offset,
        limit: args?.limit ? args?.limit + 1 : undefined,
        categoryId: args?.categoryId
      }
    });

    runInAction(() => {
      if (result.status === 200) {
        this.meta = Meta.success;
        this.setProducts(result.data.map(normalizeProduct), id, args?.limit);

        return;
      }

      this.meta = Meta.error;
    });
  };

  setProducts = (products: ProductModel[], id?: number, count?: number) => {
    this.products = products.filter((product) => product.id !== id).slice(0, count);
  };

  destroy(): void {
    // nothing to do
  }
}
