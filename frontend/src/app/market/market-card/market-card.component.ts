import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import {Product} from "../market.module";
import {TuiNotificationsService} from "@taiga-ui/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {tuiInputCountOptionsProvider} from "@taiga-ui/kit";
import {ProductsService} from "../../../services/products.service";
import {ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.less'],
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
export class MarketCardComponent implements OnInit {

  @Input()
  productData!: Product;

  form = new FormGroup({
    countValue: new FormControl(1, Validators.required),
  });

  constructor(
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    public productService: ProductsService,
    public shoppingCartService: ShoppingCartService
  ) {
  }

  ngOnInit(): void {
  }

  getFormattedPrice(): string {
    return `${this.productData.price} ₽`;
  }

  addToShoppingCart(): void {
    this.shoppingCartService.addShoppingCartItem(this.productData, this.form.get('countValue')!.value);
    this.showNotification();
  }

  showNotification(): void  {
    this.notificationsService
      .show(this.productData.title, {
        label: `Добавлено в корзину: ${this.form.get('countValue')!.value} шт`,
      })
      .subscribe();
  }
}
