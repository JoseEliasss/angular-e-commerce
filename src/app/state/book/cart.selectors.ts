import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducers';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
);
