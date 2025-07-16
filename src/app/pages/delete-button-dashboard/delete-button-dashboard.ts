import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-button-dashboard',
  imports: [],
  templateUrl: './delete-button-dashboard.html',
  styleUrl: './delete-button-dashboard.scss',
})
export class DeleteButtonDashboard implements ICellRendererAngularComp {
  rowId: string = '';
  agInit(params: ICellRendererParams<any, any, any>): void {
    console.log(params);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
}
