import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../../services/products.service";
import {tuiInputCountOptionsProvider} from "@taiga-ui/kit";
import {ShoppingCartEntity, ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-market-product-item',
  templateUrl: './market-product-item.component.html',
  styleUrls: ['./market-product-item.component.less'],
  providers: [
    tuiInputCountOptionsProvider({
      icons: {
        up: 'tuiIconChevronUp',
        down: 'tuiIconChevronDown',
      },
      appearance: 'secondary',
      step: 1,
      min: 1,
      max: 100,
    }),
  ],
})
export class MarketProductItemComponent implements OnInit, OnDestroy, DoCheck {

  @Input()
  productData!: ShoppingCartEntity;

  itemForm!: FormGroup;

  constructor(
    public productService: ProductsService,
    public shoppingCartService: ShoppingCartService
  ) {
  }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      itemCountValue: new FormControl(this.productData.count, Validators.required),
    });
    this.itemForm.get('itemCountValue')?.valueChanges.subscribe(value => this.setItemCount(value))
    console.info('DEBUG :: Create new market-product-item');
  }

  ngDoCheck(): void {
    this.itemForm.get('itemCountValue')?.setValue(this.productData.count)
    console.info('DEBUG :: Check event of market-product-item');
  }

  ngOnDestroy(): void {
    console.info('DEBUG :: Destroy new market-product-item');
  }

  setItemCount(count: number): void {
    this.shoppingCartService.setShoppingCartItemCount(this.productData.product.title, count)
  }

  deleteItem(): void {
    this.shoppingCartService.deleteShoppingCartItem(this.productData.product.title)
  }

}
