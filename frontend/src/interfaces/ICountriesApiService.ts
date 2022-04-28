import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export interface Country {
  name: string,
  currencies: [{
    code: string,
    name: string,
    symbol: string,
  }];
}

export const ICountriesApiServiceToken = new InjectionToken('ICountriesApiService');

export interface ICountriesApiService {
  getAll(): Observable<Country[]>;
}
