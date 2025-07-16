import { Component } from '@angular/core';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [Header, Footer, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {}
