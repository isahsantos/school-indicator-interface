import { Component, OnInit } from '@angular/core';
import { Escola } from '../../models/escola-model';
import { EscolaService } from '../../services/escola.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list-school',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list-school.component.html',
  styleUrl: './list-school.component.scss',
  providers:[EscolaService]
})
export class ListSchoolComponent implements OnInit {

  escolas: Escola[] = []

  constructor(private escolaService: EscolaService) { }

  ngOnInit(): void {
    this.escolaService.getEscolas().subscribe((data: Escola[]) => {
      this.escolas = data;
    });
  }
}
