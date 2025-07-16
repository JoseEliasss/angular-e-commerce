import { Component, OnInit } from '@angular/core';
import { Footer } from '../../core/footer/footer';
import { Header } from '../../core/header/header';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Countercomponent } from '../countercomponent/countercomponent';
import { Products } from '../products/products';

@Component({
  selector: 'app-home-page',
  imports: [Header, Footer, CommonModule, Countercomponent, Products],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
