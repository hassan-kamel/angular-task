import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login.component';
// import { CourseComponent } from './components/courses.component';
import { HomeComponent } from './components/home.component';
import { ProfileComponent } from './components/profile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', pathMatch: 'full', redirectTo: 'home' },
  { path: 'profile', canActivate: [authGuard], component: ProfileComponent },
  // {
  //   path: 'course/:id',
  //   canActivate: [authGuard],
  //   component: CourseComponent,
  // },
  {
    path: 'login',
    canActivate: [guestGuard],
    component: LoginComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
