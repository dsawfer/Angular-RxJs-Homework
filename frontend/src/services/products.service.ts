import {Inject, Injectable} from '@angular/core';
import {Product} from "../app/market/market.module";
import {IProductsApiService, IProductsApiServiceToken} from "../interfaces/IProductsApiService";

const path = "../../assets/images/"


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _products: Product[] = [];
  private _isShoppingCartHidden = true;

  constructor(
    @Inject(IProductsApiServiceToken) public ProductsApiService: IProductsApiService,
  ) {
  }

  get products(): Product[] {
    return this._products;
  }

  get isShoppingCartHidden(): boolean {
    return this._isShoppingCartHidden;
  }

  initialize(): void {
    this.ProductsApiService.getAll().subscribe(products => {
        this._products = products;
        this._products.map(product => product.image = `${path}${product.image}`);
      }
    )
  }

  toggleShoppingCart(): void {
    this._isShoppingCartHidden = !this._isShoppingCartHidden;
  }

}
