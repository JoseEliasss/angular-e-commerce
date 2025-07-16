import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'e-commere';
  constructor(private http: HttpClient) {}
}
