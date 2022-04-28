import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country, ICountriesApiService} from "../interfaces/ICountriesApiService";

const countriesApi = 'https://restcountries.com/v2/all';

@Injectable()
export class CountriesApiService implements ICountriesApiService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(countriesApi);
  }

}
