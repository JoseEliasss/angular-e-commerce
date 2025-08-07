import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ProductService } from '../../shared/services/productService';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
})
export class AllProducts implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  searchTerm: string = '';
  sortOrder: 'az' | 'za' | 'low-high' | 'high-low' = 'low-high';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Read query param
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search']?.toLowerCase() || '';
      this.applyFilters();
    });

    // Fetch data
    this.productService.getProcessedProducts().subscribe((data) => {
      this.products = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    if (!this.products) return;

    // Filter by search
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm)
    );

    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.sortOrder) {
      case 'az':
        this.filteredProducts.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
        break;
      case 'za':
        this.filteredProducts.sort((a, b) =>
          b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        );
        break;
      case 'low-high':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  onSortChange(): void {
    this.sortProducts();
  }

  goToProduct(id: number): void {
    this.router.navigate(['/itemcard', id]);
  }
}
