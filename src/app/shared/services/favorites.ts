import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Favorites {
  private favoriteIds = signal<Set<number>>(new Set());
  favoritesCount = signal(0);

  toggleFavorite(id: number): void {
    const updated = new Set(this.favoriteIds());
    updated.has(id) ? updated.delete(id) : updated.add(id);
    this.favoriteIds.set(updated);
    this.favoritesCount.set(updated.size);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().has(id);
  }

  getFavoriteIds(): number[] {
    return Array.from(this.favoriteIds());
  }
}
