import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ product: any }>()
);
export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ index: number }>()
);
export const clearCart = createAction('[Cart] Clear');
