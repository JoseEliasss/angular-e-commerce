import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  @Input() products: any[] = [];
  @Input() desc: string = '';
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  constructor(private http: HttpClient, private router: Router) {}
  discount = 0;
  ngOnInit(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products = data.map((product) => ({
          ...product,
          discount: (product.price * 1.5).toFixed(2),
          titleCut: product.title.slice(0, 25),
        }));
      });
  }

  goToProduct(id: number) {
    this.router.navigate(['/itemcard', id]);
  }
}
