import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; 
import { CreateSchoolComponent } from './pages/create-school/create-school.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },      
  { path: 'cadastro-escola', component: CreateSchoolComponent },           
      

];
