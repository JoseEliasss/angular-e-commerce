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
  private params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onDelete(): void {
    const rowNode = this.params.node;
    this.params.api.applyTransaction({ remove: [rowNode.data] });
  }
}
