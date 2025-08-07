import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart-services';
import { Favorites } from '../services/favorites';
import { Store } from '@ngrx/store';
import { clearCart } from '../../state/cart/cart.actions';
import { logout } from '../../state/auth/auth.actions';
import { AuthService } from '../../core/authentication/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  favoritesCount = inject(Favorites).favoritesCount;
  cartService = inject(CartService);
  cartCount = this.cartService.cartCount;

  sidebarOpen = false;
  dropdownOpen = false;
  searchTerm: string = '';
  allProducts: any[] = [];
  filteredResults: any[] = [];

  constructor() {
    document.addEventListener('click', () => {
      this.dropdownOpen = false;
    });

    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.allProducts = data;
      });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  logOutAcc() {
    this.cartService.reset();
    this.store.dispatch(clearCart());
    this.authService.logout();
    this.store.dispatch(logout());
    this.router.navigate(['']);
  }

  onSearchLive() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredResults = term
      ? this.allProducts.filter((product) =>
          product.title.toLowerCase().includes(term)
        )
      : [];
  }

  goToProduct(id: number) {
    this.filteredResults = [];
    this.searchTerm = '';
    this.router.navigate(['/itemcard', id]);
  }

  goToAllProducts() {
    this.router.navigate(['/all-products'], {
      queryParams: { search: this.searchTerm.trim() },
    });
  }
  onImgError(event: Event) {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = '/assets/placeholder.png';
    }
  }
}
