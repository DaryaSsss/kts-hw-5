import { ILocalStore } from '@utils/helpers';
import axios from 'axios';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import { Category } from './models/Category';
import { IFetchProducts, Meta, normalizeProduct, ProductModel } from './models/Product';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

class CategoriesStore {
  constructor() {
    makeAutoObservable(this, { categories: observable.ref });
  }

  categories: Category[] = [];
  meta: Meta = Meta.initial;

  /////////// COMPUTED /////////////

  /////////// METHODS //////////////

  /////////// ACTIONS //////////////

  fetchCategories = async (args?: IFetchProducts) => {
    this.meta = Meta.loading;

    const result = await axios({
      method: 'get',
      url: `${BASE_URL}/categories`
    });

    runInAction(() => {
      if (result.status === 200) {
        this.meta = Meta.success;
        this.setCategories(result.data);
        return;
      }

      this.meta = Meta.error;
    });
  };

  setCategories = (categories: Category[]) => {
    this.categories = categories;
  };

  destroy(): void {
    // nothing to do
  }
}

const categoriesStore = new CategoriesStore();
export default categoriesStore;
