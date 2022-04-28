import {Inject, Injectable} from "@angular/core";
import {Country, ICountriesApiService, ICountriesApiServiceToken} from "../interfaces/ICountriesApiService";
import {CurrenciesService} from "./currencies.service";


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _countries: Country[] = [];
  private _countiesNames: string[] = [];

  constructor(
    @Inject(ICountriesApiServiceToken) public countriesApiService: ICountriesApiService
  ) {
  }

  get counties(): Country[] {
    return this._countries;
  }

  get countiesNames(): string[] {
    return this._countiesNames;
  }

  initialize(): void {
    this.countriesApiService.getAll().subscribe(counties => {
        this._countries = counties;
        this._countiesNames = this._countries.map(country => country.name);
      }
    )
  }

  getCountry(country: string): Country {
    let currentCountry = this._countries.find(c => c.name === country);
    return currentCountry!;
  }
}
