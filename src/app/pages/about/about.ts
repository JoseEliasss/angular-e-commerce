import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { Categories } from '../../shared/components/products/categories/categories';

@Component({
  selector: 'app-about',
  imports: [CommonModule, Header, Footer, Categories],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
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
