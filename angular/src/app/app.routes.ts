import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/login/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MediaPhotoComponent } from './component/media-photo/media-photo.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' }, // Chuyển hướng mặc định đến login
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: HomeComponent }, // Trang Login
    // { path: '**', redirectTo: 'login', pathMatch: 'full' }

    { path: '', redirectTo: 'media-photo', pathMatch: 'full' }, // Chuyển hướng mặc định đến login
    { path: 'media-photo', component: MediaPhotoComponent }, // Trang Login
    { path: '**', redirectTo: 'media-photo', pathMatch: 'full' }
];
