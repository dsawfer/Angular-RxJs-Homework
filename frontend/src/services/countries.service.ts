import {Inject, Injectable} from "@angular/core";
import {Country, ICountriesApiService, ICountriesApiServiceToken} from "../interfaces/ICountriesApiService";


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _countries: Country[] = [];
  private _countiesNames: string[] = [];
  private _currentCountry: string = 'Russian Federation';

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

  get currentCountry(): string {
    return this._currentCountry;
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
    this._currentCountry = currentCountry!.name;
    return currentCountry!;
  }
}
