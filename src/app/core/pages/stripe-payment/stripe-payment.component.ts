import { Component, OnInit, Renderer2 } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { StripeCardElement, StripeCardElementOptions, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder } from '@angular/forms';
import { ApiHelperService, NotificationService, RequestService } from '@core/services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit {

  public cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '14px',
        lineHeight: '36px',
        fontWeight: 600,
        iconColor: '#2196F3'
      }
    },
    classes: {
      base: 'input w-full placeholder:font-montserrat font-montserrat placeholder:text-gray-500 text-gray-500'
    }
  };
  public elementsOptions: StripeElementsOptions = { locale: 'en' };
  public elements: StripeElements | undefined;
  public card: StripeCardElement | undefined;
  public paymentSuccess: boolean = false;
  private publicKey: string | undefined;
  private price: string | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly renderer2: Renderer2,
    private readonly stripeService: StripeService,
    private readonly apiHelperService: ApiHelperService,
    private readonly requestService: RequestService,
    private readonly notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    forkJoin([
      this.requestService.Get(this.apiHelperService.getPriceURL),
      this.requestService.Get(this.apiHelperService.getKeyURL)
    ]).subscribe(resJoin => {
      this.price = resJoin[0].price;
      this.publicKey = resJoin[1].publicKey;
      this.stripeService.setKey(<string>this.publicKey);
      this.mountStripeComponent();
    });
  }

  public createToken() {
    this.stripeService
      .createToken(<StripeCardElement>this.card, { currency: 'usd', name: 'dealersoft.de' })
      .subscribe((result) => {
        if (result.token) {
          const token: string = result.token.id;
          this.makePayment(token);
        } else if (result.error) {
          this.notificationService.riseNotification({ color: 'warning', data: <string>result.error.message });
        }
      });
  }

  private mountStripeComponent = (): void => {
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        if (!this.card) {
          this.card = this.elements.create('card', this.cardOptions);
          this.card.mount('#card-element');
        }
      });
  }

  private makePayment(token: string) {
    this.requestService.Post(this.apiHelperService.payURL, { token })
      .subscribe(() => this.paymentSuccess = true);
  }

}
