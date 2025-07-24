import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.scss'],
})
export class ItemCard implements OnInit {
  product: any = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load product.';
          this.loading = false;
        },
      });
    }
  }
}
