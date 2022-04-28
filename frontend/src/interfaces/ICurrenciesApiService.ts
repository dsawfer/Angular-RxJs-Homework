import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export interface CurrencyResponse {
  base: string,
  date: string,
  rates: {},
  success: boolean,
  timestamp: number
}

export const ICurrenciesApiServiceToken = new InjectionToken('ICurrenciesApiService');

export interface ICurrenciesApiService {
  get(symbol: string, base: string): Observable<CurrencyResponse>;
}
