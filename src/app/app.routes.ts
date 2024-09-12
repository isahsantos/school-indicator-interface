import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; 
import { CreateSchoolComponent } from './pages/create-school/create-school.component';
import { CreateResponsavelComponent } from './pages/create-responsavel/create-responsavel.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },      
  { path: 'cadastro-escola', component: CreateSchoolComponent },       
  { path: 'cadastro-responsaveis', component: CreateResponsavelComponent },  
  { path: 'responsaveis/editar/:id', component: CreateResponsavelComponent },  
  { path: 'escola/editar/:id', component: CreateSchoolComponent },         
       
    
      

];
