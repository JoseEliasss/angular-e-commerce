import { Component } from '@angular/core';
import { Products } from '../../shared/components/products/products';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-all-products',
  imports: [Header, Footer, Products],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
})
export class AllProducts {}
