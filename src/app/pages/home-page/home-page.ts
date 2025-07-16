import { Component, OnInit } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Countercomponent } from '../countercomponent/countercomponent';
import { Products } from '../../shared/components/products/products';

@Component({
  selector: 'app-home-page',
  imports: [Header, Footer, CommonModule, Countercomponent, Products],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
