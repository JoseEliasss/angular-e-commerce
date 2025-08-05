import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { DeleteButtonDashboard } from '../delete-button-dashboard/delete-button-dashboard';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [Header, Footer, AgGridAngular, FormsModule], // <-- Include FormsModule
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  rowData: any[] = [];

  newProduct = {
    title: '',
    price: null,
    category: '',
    image: '',
  };

  paginationPageSize = 5;

  colDefs: ColDef[] = [
    {
      headerName: 'Product',
      field: 'title',
      flex: 2,
      cellRenderer: (params: { data: { image: any; title: any } }) => {
        const { image, title } = params.data;
        return `
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${image}" alt="${title}" style="height: 40px; width: 40px; object-fit: contain;" />
            <span>${title}</span>
          </div>
        `;
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },
    {
      headerName: 'Actions',
      cellRenderer: DeleteButtonDashboard,
      flex: 1,
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  constructor(private http: HttpClient) {
    this.http
      .get<any[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.rowData = data;
      });
  }

  addProduct() {
    const newItem = { ...this.newProduct };
    this.rowData = [newItem, ...this.rowData];

    // Reset the form
    this.newProduct = {
      title: '',
      price: null,
      category: '',
      image: '',
    };
  }
}
