import { Observable } from "rxjs";
import {CurrencyResponse, ICurrenciesApiService} from "../interfaces/ICurrenciesApiService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { environment } from '../environments/environment';

const currenciesApi = 'https://api.apilayer.com/fixer/latest?'

@Injectable()
export class CurrenciesApiService implements ICurrenciesApiService {
  constructor(private httpClient: HttpClient) {
  }

  get(symbol: string, base: string): Observable<CurrencyResponse> {
    const headers = new HttpHeaders().set("apikey", environment.apiKey);
    return this.httpClient.get<CurrencyResponse>(`${currenciesApi}symbols=${symbol}&base=${base}`, {
      headers: headers
    });
  }
}
