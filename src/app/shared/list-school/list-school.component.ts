import { Component, OnInit } from '@angular/core';
import { Escola } from '../../models/escola-model';
import { EscolaService } from '../../services/escola.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChipComponent } from '../chip/chip.component';

@Component({
  selector: 'app-list-school',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChipComponent],
  templateUrl: './list-school.component.html',
  styleUrl: './list-school.component.scss',
  providers:[EscolaService]
})
export class ListSchoolComponent implements OnInit {

  escolas: Escola[] = []
  statusChips: { text: string, color: string }[] = [];

  constructor(private escolaService: EscolaService) { }

  ngOnInit(): void {
    this.escolaService.getEscolas().subscribe((data: Escola[]) => {
      this.escolas = data;
      this.generateStatusChips()
    });
   
  }

  generateStatusChips(): void {
    this.statusChips = this.escolas.map(() => {
      const text = this.getRandomText();
      const color = this.getRandomColor(text);
      return { text, color };
    });
  }
  getRandomText(): string {
    const texts = ['Matrículas abertas 2024', 'Matrículas Abertas 2025', 'Matrículas Encerradas'];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  }


  getRandomColor(text: string): string {
    switch (text) {
      case 'Matrículas abertas 2024':
        return 'green';
      case 'Matrículas Abertas 2025':
        return 'yellow';
      case 'Matrículas Encerradas':
        return 'red';
      default:
        return 'blue';
    }
  }
}
