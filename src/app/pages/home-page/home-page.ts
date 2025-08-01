import { Component, OnInit } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Countercomponent } from '../countercomponent/countercomponent';
import { Products } from '../../shared/components/products/products';
import { Categories } from '../../shared/components/products/categories/categories';
import { Router } from '@angular/router';
import { AuthService } from '../../core/authentication/auth';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { logout } from '../../state/auth/auth.actions';

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
export class HomePage implements OnInit {
  services = [
    { image: '/assets/freeandfastdelivery.png' },
    { image: '/assets/customerservice.png' },
    { image: '/assets/moneybackguarantee.png' },
  ];

  products: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState> // ✅ Inject NgRx store
  ) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products = data;
      });
  }

  gotToAllProducts() {
    this.router.navigate(['/allproducts']);
  }

  logOutAcc() {
    this.authService.logout(); // ✅ Clear token (optional)
    this.store.dispatch(logout()); // ✅ Dispatch logout to clear state/localStorage
    this.router.navigate(['/login']); // ✅ Redirect to login page
  }
}
