import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart } from './cart.actions';

export interface CartState {
  items: any[];
}

const savedState = localStorage.getItem('cart');
export const initialState: CartState = savedState
  ? JSON.parse(savedState)
  : { items: [] };

function saveToLocalStorage(state: CartState): CartState {
  localStorage.setItem('cart', JSON.stringify(state));
  return state;
}

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state: CartState, { product }: any) =>
    saveToLocalStorage({ ...state, items: [...state.items, product] })
  ),
  on(removeFromCart, (state: CartState, { index }: any) =>
    saveToLocalStorage({
      ...state,
      items: state.items.filter((_, i) => i !== index),
    })
  ),
  on(clearCart, () => {
    localStorage.removeItem('cart');
    return { items: [] };
  })
);
