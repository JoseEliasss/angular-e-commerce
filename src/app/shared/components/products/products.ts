import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnChanges {
  @Input() desc: string = '';
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() sortOrder: 'az' | 'za' | 'low-high' | 'high-low' = 'az';

  products: any[] = [];
  private hasLoaded = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products = data.map((product) => ({
          ...product,
          discount: (product.price * 1.5).toFixed(2),
          titleCut: product.title.slice(0, 25),
        }));
        this.hasLoaded = true;
        this.sortProducts();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortOrder'] && this.hasLoaded) {
      this.sortProducts();
    }
  }

  sortProducts() {
    if (!this.products.length) return;

    switch (this.sortOrder) {
      case 'az':
        this.products.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        break;
      case 'za':
        this.products.sort((a, b) =>
          b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        );
        break;
      case 'low-high':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        this.products.sort((a, b) => b.price - a.price);
        break;
    }
  }

  goToProduct(id: number) {
    this.router.navigate(['/itemcard', id]);
  }
}
