import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { DashboardLayoutComponent } from './layouts/dashboard/dashboard';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  // Public routes with navbar
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Dashboard routes without navbar
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
      // ... other dashboard routes can be added here
    ]
  },

  { path: '**', redirectTo: '/home' } // Catch-all redirects to home
];

