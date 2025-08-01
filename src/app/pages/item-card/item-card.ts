// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Header } from '../../shared/header/header';
// import { Footer } from '../../shared/footer/footer';
// import { CartService } from '../../shared/services/cart-services';
// import { Store } from '@ngrx/store';
// import { AppState } from '../../state/app.state';
// import { addToCart } from '../../state/cart/cart.actions';
// import { Favorites } from '../../shared/services/favorites';

// @Component({
//   selector: 'app-item-card',
//   standalone: true,
//   imports: [CommonModule, Header, Footer],
//   templateUrl: './item-card.html',
//   styleUrls: ['./item-card.scss'],
// })
// export class ItemCard implements OnInit {
//   quantity = 1;
//   product: any = null;
//   loading = true;
//   error = '';
//   products: any[] | undefined;
//   size = '';
//   added = false;

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private router: Router,
//     private store: Store<AppState>,
//     private cartService: CartService,
//     private favorites: Favorites
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.route.paramMap.subscribe((params) => {
//         const id = Number(params.get('id'));
//         this.loadProduct(id);
//       });

//       this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe({
//         next: (data) => {
//           this.product = data;
//           this.loading = false;
//         },
//         error: () => {
//           this.error = 'Failed to load product.';
//           this.loading = false;
//         },
//       });
//     }
//     this.http
//       .get<any[]>('https://fakestoreapi.com/products')
//       .subscribe((data) => {
//         this.products = data;
//       });
//   }
//   buyNow() {}

//   goToProduct(id: number) {
//     this.router.navigate(['/itemcard', id]);
//   }
//   loadProduct(id: number) {
//     this.http
//       .get(`https://fakestoreapi.com/products/${id}`)
//       .subscribe((data) => {
//         this.product = data;
//       });
//   }
//   minusOne() {
//     this.quantity <= 1 ? (this.quantity = 1) : (this.quantity -= 1);
//   }
//   plusOne() {
//     this.quantity += 1;
//   }
//   addToCart() {
//     this.cartService.increment();
//     this.store.dispatch(addToCart({ product: this.product }));

//     this.added = true;
//     setTimeout(() => {
//       this.added = false;
//     }, 3000);
//   }

//   toggleFavorite() {
//     if (this.product) {
//       this.favorites.toggleFavorite(this.product.id);
//     }
//   }

//   isFavorite(): boolean {
//     return this.product ? this.favorites.isFavorite(this.product.id) : false;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { CartService } from '../../shared/services/cart-services';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addToCart } from '../../state/cart/cart.actions';
import { Favorites } from '../../shared/services/favorites';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.scss'],
})
export class ItemCard implements OnInit {
  quantity = 1;
  product: any = null;
  loading = true;
  error = '';
  products: any[] = [];
  added = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    private cartService: CartService,
    private favorites: Favorites
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }

    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products = data;
      });
  }

  loadProduct(id: number) {
    this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load product.';
        this.loading = false;
      },
    });
  }

  minusOne() {
    if (this.quantity > 1) this.quantity--;
  }

  plusOne() {
    this.quantity++;
  }

  addToCart() {
    this.cartService.increment();
    this.store.dispatch(addToCart({ product: this.product }));
    this.added = true;
    setTimeout(() => (this.added = false), 3000);
  }

  toggleFavorite() {
    if (this.product) this.favorites.toggleFavorite(this.product.id);
  }

  isFavorite(): boolean {
    return this.product ? this.favorites.isFavorite(this.product.id) : false;
  }
  goToProduct(id: number) {
    this.router.navigate(['/itemcard', id]);
  }
}
