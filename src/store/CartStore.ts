import { makeAutoObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { Meta, ProductModel } from './models/Product';

class CartStore {
  constructor() {
    makeAutoObservable(this, { cartProducts: observable.ref });
    makePersistable(this, {
      name: 'CartStore',
      properties: ['cartProducts'],
      storage: window.localStorage
    });
  }

  cartProducts: ProductModel[] = [];

  /////////// COMPUTED /////////////

  /////////// METHODS //////////////

  /////////// ACTIONS //////////////
  addProductToCart = (product: ProductModel) => {
    this.cartProducts = [...this.cartProducts, product];
  };

  deleteFromCart = (product: ProductModel) => {
    this.cartProducts = this.cartProducts.filter((p) => p.id !== product.id);
  };
}

const cartStore = new CartStore();
export default cartStore;
