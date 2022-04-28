import {Injectable} from "@angular/core";
import {IProductsApiService} from "../interfaces/IProductsApiService";
import {Observable} from "rxjs";
import {Product} from "../app/market/market.module";
import {HttpClient} from "@angular/common/http";

const host = 'http://localhost:3000/products';

@Injectable()
export class ProductsApiService implements IProductsApiService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(host);
  }

}
