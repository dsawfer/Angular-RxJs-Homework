import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.less'],
})
export class MarketListComponent implements OnInit {

  constructor(
    public productService: ProductsService,
  ) {
  }

  ngOnInit(): void {
  }

}
