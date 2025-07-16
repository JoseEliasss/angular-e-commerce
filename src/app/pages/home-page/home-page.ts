import { Component, OnInit } from '@angular/core';
import { Footer } from '../../core/footer/footer';
import { Header } from '../../core/header/header';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Countercomponent } from '../countercomponent/countercomponent';

@Component({
  selector: 'app-home-page',
  imports: [Header, Footer, CommonModule, Countercomponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products = data;
      });
  }
}
