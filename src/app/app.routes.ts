import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { SignUp } from './pages/sign-up/sign-up';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { canActivateGuard } from './core/can-activate-guard';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'signup', component: SignUp },
  { path: 'login', component: Login },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: 'admindashboard', component: AdminDashboard },
  // {
  //   path: 'about',
  //   loadComponent: () => import('./pages/about/about').then((m) => m.About),
  //   canActivate: [canActivateGuard],
  // },
  { path: '**', component: NotFound },
];
