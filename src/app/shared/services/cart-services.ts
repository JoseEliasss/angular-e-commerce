import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  addToCart(product: any) {
    this.cartItems.push(product);
  }

  getCartItems(): any[] {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  clearCart() {
    this.cartItems = [];
  }
}
