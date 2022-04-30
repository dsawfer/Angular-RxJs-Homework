import {Injectable} from "@angular/core";
import {Product} from "../app/market/market.module";
import {CountriesService} from "./countries.service";
import {CurrenciesService} from "./currencies.service";

export interface ShoppingCartEntity {
  product: Product;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _shoppingCart: ShoppingCartEntity[]= [];

  constructor(
    public countriesService: CountriesService,
    public currenciesService: CurrenciesService,
    ) {
  }

  initialize(): void {
    this.loadShoppingCart();
  }

  get shoppingCart(): ShoppingCartEntity[] {
    return this._shoppingCart
  }

  addShoppingCartItem(product: Product, count: number): void {
    let productIndex = this._shoppingCart.findIndex(item => item.product.title === product.title);

    if (productIndex !== -1) {
      this._shoppingCart[productIndex].count += count;
    } else {
      this._shoppingCart.push({
        product: product,
        count: count,
      })
    }

    this.saveShoppingCart();
  }

  setShoppingCartItemCount(title: string, count: number): void {
    let productIndex = this._shoppingCart.findIndex(item => item.product.title === title);
    this._shoppingCart[productIndex].count = count;
  }

  deleteShoppingCartItem(title: string) {
    let productIndex = this._shoppingCart.findIndex(item => item.product.title === title);
    this._shoppingCart.splice(productIndex, 1);
    this.saveShoppingCart();
  }

  getSum(): string {
    let sum = 0;
    for (const item of this._shoppingCart) {
      sum += (item.product.price * item.count)
    }
    return `${(sum * this.currenciesService.currencyCoefficient).toFixed(2)} ${this.currenciesService.currencySymbol}`;
  }

  saveShoppingCart() {
    localStorage.setItem('ShoppingCart', JSON.stringify(this._shoppingCart))
  }

  loadShoppingCart() {
    if (localStorage.getItem('ShoppingCart') !== null) {
      this._shoppingCart = JSON.parse(localStorage['ShoppingCart']);
    }
  }

}
