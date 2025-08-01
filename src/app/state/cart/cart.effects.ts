import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addToCart } from './cart.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions) {}

  logAddToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCart),
        tap((action: ReturnType<typeof addToCart>) => {
          console.log('🛒 Added to cart:', action.product);
        })
      ),
    { dispatch: false }
  );
}
