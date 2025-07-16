import { Component } from '@angular/core';
import { Footer } from '../../core/footer/footer';
import { Header } from '../../core/header/header';

@Component({
  selector: 'app-home-page',
  imports: [Header, Footer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
