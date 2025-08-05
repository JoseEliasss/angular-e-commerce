import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { AppState } from '../../state/app.state';
import {
  selectCartItems,
  selectCartTotal,
} from '../../state/cart/cart.selectors';
import { clearCart, removeFromCart } from '../../state/cart/cart.actions';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart-services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, Header, Footer, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class Cart {
  cartItems$: Observable<any[]>;
  cartTotal$: Observable<number>;
  localCart: any[] = [];
  total: number = 0;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      this.localCart = items.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
      this.calculateTotal();
    });
  }

  removeItem(index: number): void {
    this.cartService.decrement();
    this.localCart.splice(index, 1);
    this.calculateTotal();
    this.store.dispatch(removeFromCart({ index }));
  }

  increaseQty(index: number): void {
    this.localCart[index].quantity += 1;
    this.calculateTotal();
  }

  decreaseQty(index: number): void {
    if (this.localCart[index].quantity > 1) {
      this.localCart[index].quantity -= 1;
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = this.localCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.cartService.setTotal(this.total);
  }

  goToShop(): void {
    this.router.navigate(['/']);
  }

  goToCheckout(): void {
    const authRaw = localStorage.getItem('authState');
    const loggedIn = authRaw ? JSON.parse(authRaw)?.loggedIn === true : false;

    if (!loggedIn) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/checkout' },
      });
    } else {
      this.router.navigate(['/checkout']);
    }
  }

  clearCart(): void {
    this.cartService.reset();
    this.store.dispatch(clearCart());
  }
}
