import { AuthState } from './auth/autht.reducers';
import { CartState } from './cart/cart.reducers';

export interface AppState {
  cart: CartState;
  auth: AuthState;
}
