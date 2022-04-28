import {InjectionToken} from "@angular/core";
import {Product} from "../app/market/market.module";
import {Observable} from "rxjs";

export const IProductsApiServiceToken = new InjectionToken('IProductsApiService');

export interface IProductsApiService {
  getAll(): Observable<Product[]>;
  getAll(): Observable<Product[]>;
}
