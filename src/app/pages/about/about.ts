import { Component } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [Header, Footer, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
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

  founders = [
    {
      image: 'assets/founder1.png',
      name: 'Tom Cruise',
      position: 'Founder & Chairman',
      icon: 'assets/twitterInstaLinkedin.png',
    },
    {
      image: 'assets/founder2.png',
      name: 'Emma Watson',
      position: 'Managing Director',
      icon: 'assets/twitterInstaLinkedin.png',
    },
    {
      image: 'assets/founder3.png',
      name: 'Will Smith',
      position: 'Product Designer',
      icon: 'assets/twitterInstaLinkedin.png',
    },
  ];
  services = [
    { image: '/assets/freeandfastdelivery.png' },
    { image: '/assets/customerservice.png' },
    { image: '/assets/moneybackguarantee.png' },
  ];
}
