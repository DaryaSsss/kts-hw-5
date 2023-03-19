import { BASE_URL } from '@config/API';
import { ILocalStore } from '@utils/helpers';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { Meta, normalizeProduct, ProductModel } from './models/Product';

export default class SingleProductStore implements ILocalStore {
  constructor() {
    makeAutoObservable(this);
  }

  product: ProductModel | null = null;
  meta: Meta = Meta.initial;

  /////////// COMPUTED /////////////

  /////////// METHODS //////////////
  fetchSingleProduct = async (id: number) => {
    this.meta = Meta.loading;

    const result = await axios({
      method: 'get',
      url: `${BASE_URL}/products/${id}`
    });

    runInAction(() => {
      if (result.status === 200) {
        this.meta = Meta.success;
        this.setSingleProduct(normalizeProduct(result.data));
        return;
      }

      this.meta = Meta.error;
    });
  };

  /////////// ACTIONS //////////////
  setSingleProduct = (product: ProductModel) => {
    this.product = product;
  };

  destroy(): void {
    // nothing to do
  }
}
