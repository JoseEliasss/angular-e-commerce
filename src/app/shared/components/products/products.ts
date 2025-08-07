import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  @Input() desc: string = '';
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() sortOrder: 'az' | 'za' | 'low-high' | 'high-low' = 'az';
  @Input() searchTerm: string = '';

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProcessedProducts().subscribe((data) => {
      this.products = data;
      this.applyFilters();
    });

    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search']?.toLowerCase() || '';
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) =>
      this.desc
        ? product.category.toLowerCase() === this.desc.toLowerCase()
        : true
    );

    if (this.searchTerm) {
      this.filteredProducts = this.filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(this.searchTerm)
      );
    }

    this.sortFilteredProducts();
  }

  sortFilteredProducts() {
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

  goToProduct(id: number) {
    this.router.navigate(['/itemcard', id]);
  }
}
