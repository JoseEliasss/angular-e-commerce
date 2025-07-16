import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import {
  AllCommunityModule,
  ModuleRegistry,
  PaginationModule,
  themeAlpine,
  themeQuartz,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';
import { filter } from 'rxjs';
import { DeleteButtonDashboard } from '../delete-button-dashboard/delete-button-dashboard';
import { themeBalham } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-admin-dashboard',
  imports: [Header, Footer, AgGridAngular],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  rowData = [
    { Id: '1', Name: 'Model Y', Price: 64950, Status: 'available' },
    { Id: '2', Name: 'F-Series', Price: 33850, Status: 'notAvailable' },
    { Id: '3', Name: 'Corolla', Price: 29600, Status: 'available' },
  ];
  colDefs: ColDef[] = [
    { field: 'Id', filter: true },
    { field: 'Name', editable: true, cellEditor: 'agTextCellEditor' },
    {
      field: 'Price',
      valueFormatter: (params) => {
        return '$' + params.value.toLocaleString();
      },
    },
    {
      field: 'status',
      cellRenderer: (params: any) => {
        const status = params.data.Status;
        const color = status === 'available' ? 'green' : 'red';
        return `
      <span style="display: inline-block; padding: 4px 8px; color: white; background-color: ${color}; border-radius: 4px;">
        ${status}
      </span>
    `;
      },
    },
    {
      headerName: 'Actions',
      cellRenderer: DeleteButtonDashboard,
    },
  ];
}
// const myTheme = themeQuartz.withParams({
//   backgroundColor: 'rgb(249, 245, 227)',
//   foregroundColor: 'rgb(126, 46, 132)',
//   headerTextColor: 'rgb(204, 245, 172)',
//   headerBackgroundColor: 'rgb(209, 64, 129)',
//   oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
//   headerColumnResizeHandleColor: 'rgb(126, 46, 132)',
// });
