import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../state/app.state';
import {
  selectCartItems,
  selectCartTotal,
} from '../../state/cart/cart.selectors';
import { clearCart } from '../../state/cart/cart.actions';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { CartService } from '../../shared/services/cart-services';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header, Footer],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss'],
})
export class Checkout implements OnInit {
  checkoutForm!: FormGroup;
  orderMessage = '';
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private cartService = inject(CartService);
  private formBuilder = inject(FormBuilder);

  cartItems: any[] = [];
  subtotal = 0;
  total = this.cartService.total;

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      fname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      company: [
        '',

        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      apartment: [
        '',

        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      payment: ['cash', [Validators.required]],
      saveInfo: [false],
      coupon: [''],
    });

    this.store.select(selectCartItems).subscribe((items) => {
      this.cartItems = items;
    });

    this.store.select(selectCartTotal).subscribe((total) => {
      this.subtotal = total;
    });
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formData = this.checkoutForm.value;

    console.log('Order Placed:', formData, this.cartItems, this.subtotal);

    this.store.dispatch(clearCart());

    this.orderMessage = '✅ Your order has been sent successfully!';
  }
}
