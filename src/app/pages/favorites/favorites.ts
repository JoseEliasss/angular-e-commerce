import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Favorites } from '../../shared/services/favorites';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class FavoritesComponent implements OnInit {
  private http = inject(HttpClient);
  private favoritesService = inject(Favorites);

  products = signal<any[]>([]);
  favoriteProducts = signal<any[]>([]);

  ngOnInit(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.products.set(data);
        const favIds = this.favoritesService.getFavoriteIds();
        const filtered = data.filter((p) => favIds.includes(p.id));
        this.favoriteProducts.set(filtered);
      });
  }
}

export { Favorites };
