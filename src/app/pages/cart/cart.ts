import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class Cart {
  private router = inject(Router);
  private http = inject(HttpClient);

  // ✅ Cart items with added local `quantity`
  cartItems = signal<any[]>([]);
  cartTotal = computed(() =>
    this.cartItems()
      .map((item) => item.price * item.quantity)
      .reduce((acc, val) => acc + val, 0)
  );

  constructor() {
    this.fetchCartItems();
  }

  fetchCartItems() {
    // ✅ Fake API — customize this to your real endpoint if needed
    this.http
      .get<any[]>('https://fakestoreapi.com/products?limit=3') // example with limit
      .subscribe((items) => {
        const withQuantities = items.map((item) => ({
          ...item,
          quantity: 1, // start with 1 quantity
        }));
        this.cartItems.set(withQuantities);
      });
  }

  increaseItemQty(index: number) {
    const updated = this.cartItems().map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.cartItems.set(updated);
  }

  decreaseItemQty(index: number) {
    const updated = this.cartItems().map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    this.cartItems.set(updated);
  }

  removeItem(index: number) {
    const updated = this.cartItems().filter((_, i) => i !== index);
    this.cartItems.set(updated);
  }

  clearCart() {
    this.cartItems.set([]);
  }

  goToHomePage() {
    this.router.navigate(['']);
  }
}
