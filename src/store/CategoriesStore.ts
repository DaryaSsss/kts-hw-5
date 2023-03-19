import { BASE_URL } from '@config/API';
import axios from 'axios';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import { Category } from './models/Category';
import { IFetchProducts, Meta } from './models/Product';

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
}

const categoriesStore = new CategoriesStore();
export default categoriesStore;
