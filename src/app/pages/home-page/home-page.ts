import { Component, OnInit } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { CommonModule } from '@angular/common';
import { Countercomponent } from '../countercomponent/countercomponent';
import { Products } from '../../shared/components/products/products';
import { Router } from '@angular/router';
import { AuthService } from '../../core/authentication/auth';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { logout } from '../../state/auth/auth.actions';
import { CartService } from '../../shared/services/cart-services';
import { clearCart } from '../../state/cart/cart.actions';
import { ProductService } from '../../shared/services/productService';
import { Categories } from '../../shared/components/categories/categories';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    Header,
    Footer,
    CommonModule,
    Countercomponent,
    Categories,
    Products,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  services = [
    { image: '/assets/freeandfastdelivery.png' },
    { image: '/assets/customerservice.png' },
    { image: '/assets/moneybackguarantee.png' },
  ];

  products: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  gotToAllProducts() {
    this.router.navigate(['/allproducts']);
  }

  // logOutAcc() {
  //   this.cartService.reset();
  //   this.store.dispatch(clearCart());
  //   this.authService.logout();
  //   this.store.dispatch(logout());
  // }
}
