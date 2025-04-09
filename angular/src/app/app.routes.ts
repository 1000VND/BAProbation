import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/login/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { VehicleGroupManageComponent } from './component/vehicle-group-manage/vehicle-group-manage.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'login', pathMatch: 'full' }, // Chuyển hướng mặc định đến login
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: HomeComponent }, // Trang Login
    // { path: '**', redirectTo: 'login', pathMatch: 'full' }
    { path: '', redirectTo: 'vehicle-group-manage', pathMatch: 'full' },
    { path: 'vehicle-group-manage', component: VehicleGroupManageComponent },
    { path: '**', redirectTo: 'vehicle-group-manage', pathMatch: 'full' }
];
