import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ListSchoolComponent } from '../../shared/list-school/list-school.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ListSchoolComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
