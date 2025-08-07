import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products$!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    if (!this.products$) {
      this.products$ = this.http
        .get<any[]>('https://fakestoreapi.com/products')
        .pipe(shareReplay(1));
    }
    return this.products$;
  }

  getProcessedProducts(): Observable<any[]> {
    return this.getProducts().pipe(
      map((data) =>
        data.map((product) => ({
          ...product,
          discount: (product.price * 1.5).toFixed(2),
          titleCut: product.title.slice(0, 25),
        }))
      )
    );
  }
}
