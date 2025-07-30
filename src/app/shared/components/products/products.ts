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

  ngOnInit(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products = data;
      });
  }
  goToProduct(id: number) {
    this.router.navigate(['/itemcard', id]);
  }
}
