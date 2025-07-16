import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  hoveredIndex: number | null = null;

  images = [
    {
      default: 'assets/Category-Phone=Camera-Hover=No.png',
      hover: 'assets/Category-Phone=Camera-Hover=Yes.png',
    },
    {
      default: 'assets/Category-Phone=Computer-Hover=No.png',
      hover: 'assets/Category-Phone=Computer-Hover=Yes.png',
    },
    {
      default: 'assets/Category-Phone=Gaming-Hover=No.png',
      hover: 'assets/Category-Phone=Gaming-Hover=Yes.png',
    },
    {
      default: 'assets/Category-Phone=Headphone-Hover=No.png',
      hover: 'assets/Category-Phone=Headphone-Hover=Yes.png',
    },
    {
      default: 'assets/Category-Phone=Phone-Hover=No.png',
      hover: 'assets/Category-Phone=Phone-Hover=Yes.png',
    },
    {
      default: 'assets/Category-Phone=SmartWatch-Hover=No.png',
      hover: 'assets/Category-Phone=SmartWatch-Hover=Yes.png',
    },
  ];

  setHovered(index: number | null) {
    this.hoveredIndex = index;
  }
}
