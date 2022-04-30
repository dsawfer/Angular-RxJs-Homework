import {Inject, Injectable} from "@angular/core";
import {ICurrenciesApiService, ICurrenciesApiServiceToken} from "../interfaces/ICurrenciesApiService";
import {CountriesService} from "./countries.service";
import {Observable, of, Subject} from "rxjs";

export interface Currency {
  code: string,
  coefficient: number
}

const baseCurrency = 'RUB';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private _currencies: Currency[] = [];
  private _currencyCoefficient: number = 1;
  private _currencySymbol: string = '₽';

  get currencyCoefficient() {
    return this._currencyCoefficient;
  }

  get currencySymbol() {
    return this._currencySymbol;
  }

  constructor(
    @Inject(ICurrenciesApiServiceToken) public currenciesApiService: ICurrenciesApiService,
    public countriesService: CountriesService,
  ) {
  }

  setCurrencyCoefficient(country: string): Observable<void> {
    let countryEntity = this.countriesService.getCountry(country);
    let existingCurrency = this._currencies.find(cur => cur.code === countryEntity.currencies[0].code);
    if (existingCurrency !== undefined) {
      this._currencyCoefficient = existingCurrency.coefficient;
      this._currencySymbol = countryEntity.currencies[0].symbol;
      return of(void 0);
    }

    return this.requestCurrency(countryEntity.currencies[0].code, baseCurrency, countryEntity.currencies[0].symbol);
  }

  requestCurrency(desired: string, base: string, symbol: string): Observable<void> {
    let sub = new Subject<void>();

    this.currenciesApiService.get(desired, base).subscribe(currency => {
      this._currencies.push({
        code: desired,
        coefficient: currency.rates[desired as keyof typeof currency.rates],
      })

      this._currencyCoefficient = this._currencies[this._currencies.length - 1].coefficient;
      this._currencySymbol = symbol;

      sub.next();
    })

    return sub;
  }

}
