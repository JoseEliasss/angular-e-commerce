import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

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
  products: any[] | undefined;
  size = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));
        this.loadProduct(id);
      });

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
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products = data;
      });
  }
  buyNow() {}

  goToProduct(id: number) {
    this.router.navigate(['/itemcard', id]);
  }
  loadProduct(id: number) {
    this.http
      .get(`https://fakestoreapi.com/products/${id}`)
      .subscribe((data) => {
        this.product = data;
      });
  }
  minusOne() {
    this.quantity <= 1 ? (this.quantity = 1) : (this.quantity -= 1);
  }
  plusOne() {
    this.quantity += 1;
  }
}
