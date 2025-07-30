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
} from '../../state/book/cart.selectors';
import { clearCart, removeFromCart } from '../../state/book/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class Cart {
  cartItems$: Observable<any[]>;
  cartTotal$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  removeItem(index: number): void {
    this.store.dispatch(removeFromCart({ index }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
