import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market.component';
import { MarketListComponent } from './market-list/market-list.component';
import { MarketShoppingCartComponent } from './market-shopping-cart/market-shopping-cart.component';
import { MarketCardComponent } from './market-card/market-card.component';
import { MarketProductItemComponent } from './market-product-item/market-product-item.component';
import {TuiButtonModule, TuiPrimitiveTextfieldModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {IProductsApiServiceToken} from "../../interfaces/IProductsApiService";
import {ProductsApiService} from "../../services/productsApi.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  TuiBadgeModule,
  TuiComboBoxModule, TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiInputCountModule,
  TuiInputModule, TuiSelectModule
} from "@taiga-ui/kit";
import {TuiMoneyModule} from "@taiga-ui/addon-commerce";
import {TuiLetModule} from "@taiga-ui/cdk";
import {ICountriesApiServiceToken} from "../../interfaces/ICountriesApiService";
import {CountriesApiService} from "../../services/countriesApi.service";
import {ICurrenciesApiServiceToken} from "../../interfaces/ICurrenciesApiService";
import {CurrenciesApiService} from "../../services/currenciesApi.service";


export interface Product {
  id?: number;
  title: string;
  price: number;
  image?: string;
}

@NgModule({
  declarations: [
    MarketComponent,
    MarketListComponent,
    MarketShoppingCartComponent,
    MarketCardComponent,
    MarketProductItemComponent,
  ],
  exports: [
    MarketComponent,
    MarketShoppingCartComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiInputCountModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    TuiBadgeModule,
    FormsModule,
    TuiInputModule,
    TuiFieldErrorModule,
    TuiMoneyModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiLetModule,
    TuiSelectModule
  ],
  providers: [
    {provide: IProductsApiServiceToken, useClass: ProductsApiService},
    {provide: ICountriesApiServiceToken, useClass: CountriesApiService},
    {provide: ICurrenciesApiServiceToken, useClass: CurrenciesApiService}
  ]
})
export class MarketModule { }
