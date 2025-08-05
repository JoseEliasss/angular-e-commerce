import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart-services';
import { Favorites } from '../services/favorites';
import { Store } from '@ngrx/store';
import { clearCart } from '../../state/cart/cart.actions';
import { logout } from '../../state/auth/auth.actions';
import { AuthService } from '../../core/authentication/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);
  favoritesCount = inject(Favorites).favoritesCount;
  cartService = inject(CartService);
  cartCount = this.cartService.cartCount;

  sidebarOpen = false;
  dropdownOpen = false;

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
  constructor() {
    document.addEventListener('click', () => {
      this.dropdownOpen = false;
    });
  }
}
