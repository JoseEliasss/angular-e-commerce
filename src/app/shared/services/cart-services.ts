import { Injectable, signal, computed, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectCartItems } from '../../state/cart/cart.selectors';

@Injectable({ providedIn: 'root' })
export class CartService {
  [x: string]: any;
  private cartCountSignal = signal(0);
  private totalSignal = signal(0);

  readonly cartCount = this.cartCountSignal.asReadonly();
  readonly total = this.totalSignal.asReadonly();

  constructor(private store: Store<AppState>) {
    effect(() => {
      this.store.select(selectCartItems).subscribe((items) => {
        this.cartCountSignal.set(items.length);
      });
    });
  }
  setTotal(amount: number): void {
    this.totalSignal.set(amount);
  }
  increment() {
    this.cartCountSignal.update((count) => count + 1);
  }

  decrement() {
    this.cartCountSignal.update((count) => Math.max(count - 1, 0));
  }

  reset() {
    this.cartCountSignal.set(0);
    this.totalSignal.set(0);
  }
}
