import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import {CountriesService} from "../../../services/countries.service";
import {CurrenciesService} from "../../../services/currencies.service";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";


@Component({
  selector: 'app-market-shopping-cart',
  templateUrl: './market-shopping-cart.component.html',
  styleUrls: ['./market-shopping-cart.component.less'],
  providers: [{
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
      required: 'Поле обязательно для заполнения',
      email: 'Неправильный формат электронной почты'
    },
  }]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketShoppingCartComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    public countriesService: CountriesService,
    public shoppingCartService: ShoppingCartService,
    public currenciesService: CurrenciesService,
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      countryValue: new FormControl(null, [Validators.required]),
      addressValue: new FormControl(null, [Validators.required]),
      nameValue: new FormControl(null, [Validators.required]),
      emailValue: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.registrationForm.get('countryValue')?.valueChanges.subscribe(
      country => this.currenciesService.setCurrencyCoefficient(country)
    )

    this.shoppingCartService.initialize();
  }

}


