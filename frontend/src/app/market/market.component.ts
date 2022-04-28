import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {CountriesService} from "../../services/countries.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.less']
})
export class MarketComponent implements OnInit {

  constructor(
    public productService: ProductsService,
    public countriesService: CountriesService
    ) {
  }

  ngOnInit(): void {
    this.productService.initialize();
    this.countriesService.initialize();
  }

  showShoppingCart(): void {
    this.productService.toggleShoppingCart();
  }

}
