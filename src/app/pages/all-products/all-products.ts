import { Component } from '@angular/core';
import { Products } from '../../shared/components/products/products';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  imports: [Header, Footer, Products, FormsModule],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
})
export class AllProducts {
  sortOrder: 'low-high' | 'high-low' | 'az' | 'za' = 'low-high';
}
