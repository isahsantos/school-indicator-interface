import { Component, OnInit } from '@angular/core';
import { Escola } from '../../models/escola-model';
import { EscolaService } from '../../services/escola.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChipComponent } from '../chip/chip.component';
import { NotificationService } from '../../services/notification.service';
import { FiltroPrecoComponent } from '../filtro-preco/filtro-preco.component';
import { LoadingComponent } from "../loading/loading.component";
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-list-school',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ChipComponent, FiltroPrecoComponent, LoadingComponent, MatSelectModule, FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './list-school.component.html',
  styleUrl: './list-school.component.scss',
  providers:[EscolaService, NotificationService]
})
export class ListSchoolComponent implements OnInit {

  escolas: Escola[] = [];
  statusChips: { text: string, color: string }[] = [];
  isLoading: boolean = false;
  metodologias: string[] = [];
  metodologiaSelecionada: string = '';


  constructor(
    private escolaService: EscolaService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.escolaService.escolas$.subscribe((data: Escola[]) => {
      this.escolas = data;
      this.metodologias = this.normalizarMetodologias(data.map(escola => escola.metodologia));
      this.generateStatusChips();
       this.isLoading = false
    });

 
    this.escolaService.getEscolas().subscribe((data: Escola[]) => {
      this.escolaService.atualizarListaDeEscolasObservable(data);
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

  openInfoEscola(escola: Escola) {
    this.notificationService.showSchoolContact(escola.nome, escola.telefone, 'Dados da escola');
  }

  getNewData(dataEvent:any){
    this.isLoading = true
    setTimeout(() => {
      this.escolas = dataEvent;
      this.isLoading = false
    }, 2000);
  }
  filttroPorMetodologia(){
    this.isLoading = true
      this.escolaService.buscarEscolasPorMetodologia(this.metodologiaSelecionada).subscribe((data: any[]) => {
        this.escolas = data;
        this.isLoading = false
      });
  }
  normalizarMetodologias(metodologias: string[]): string[] {
    const metodologiasNormalizadas = metodologias.map(metodologia =>
      metodologia.trim().toLowerCase() 
    );
    
    return [...new Set(metodologiasNormalizadas)];
  }
}
