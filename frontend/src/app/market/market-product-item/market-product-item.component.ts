import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
export class MarketProductItemComponent implements OnInit, OnDestroy{

  @Output()
  countChanged = new EventEmitter<void>();

  @Input()
  productData!: ShoppingCartEntity;

  itemForm!: FormGroup;

  constructor(
    public shoppingCartService: ShoppingCartService,
  ) {
  }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      itemCountValue: new FormControl(this.productData.count, Validators.required),
    });
    this.itemForm.get('itemCountValue')?.valueChanges.subscribe(value => {
      this.shoppingCartService.setShoppingCartItemCount(this.productData.product.title, value);
      this.countChanged.emit();
    })
    console.info('DEBUG :: Create new market-product-item');
  }

  // ngDoCheck(): void {
  //   this.itemForm.get('itemCountValue')?.setValue(this.productData.count);
  //   console.info('DEBUG :: Check event of market-product-item');
  // }

  ngOnDestroy(): void {
    console.info('DEBUG :: Destroy new market-product-item');
  }

  deleteItem(): void {
    this.shoppingCartService.deleteShoppingCartItem(this.productData.product.title);
    this.countChanged.emit();
  }

}
