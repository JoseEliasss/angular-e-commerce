import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { SignUp } from './pages/sign-up/sign-up';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { canActivateGuard } from './core/can-activate-guard';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AllProducts } from './pages/all-products/all-products';

import { ItemCard } from './pages/item-card/item-card';
import { Cart } from './pages/cart/cart';
import { FavoritesComponent } from './pages/favorites/favorites';
import { Checkout } from './pages/checkout/checkout';
import { redirectIfLoggedInGuard } from './core/redirect-if-logged-in.guard';
import { adminOnlyGuard } from './core/admin-only-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  { path: 'itemcard/:id', component: ItemCard },
  { path: 'login', component: Login, canActivate: [redirectIfLoggedInGuard] },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  {
    path: 'admindashboard',
    component: AdminDashboard,
    canActivate: [adminOnlyGuard],
  },
  { path: 'signup', component: SignUp, canActivate: [redirectIfLoggedInGuard] },
  { path: 'allproducts', component: AllProducts },
  { path: 'cart', component: Cart },
  { path: 'favorite', component: FavoritesComponent },
  { path: 'checkout', component: Checkout },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/sign-up/sign-up').then((m) => m.SignUp),
    canActivate: [canActivateGuard],
  },
  { path: '**', component: NotFound },
];
