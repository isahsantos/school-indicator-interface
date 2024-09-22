import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { EscolaService } from '../../services/escola.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Escola } from '../../models/escola-model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filtro-preco',
  standalone: true,
  imports: [
    MatSliderModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule

  ],
  templateUrl: './filtro-preco.component.html',
  styleUrl: './filtro-preco.component.scss',
  providers: [EscolaService]
})
export class FiltroPrecoComponent {
  @Output() filtroAtualizado = new EventEmitter<any>()
  precoMaximo: number = 10000;
  precoMin = 0
  filtroPreco: number = 0;
  escolas: Escola[] = [];
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  constructor(private escolasService: EscolaService) { }

  ngOnInit(): void {

    this.escolasService.getEscolas().subscribe(data => {
      const precos = data.map(escola => escola.mensalidade);
      this.precoMaximo = Math.max(...precos);
    });
  }


  formatLabel(value: number): string {
    this.value = value
    return `${value}`;
  }
  obterPrecoMaximo() {
    this.escolasService.getEscolas().subscribe(data => {
      const precos = data.map(escola => escola.mensalidade);
      this.precoMaximo = Math.max(...precos);
    });
  }

  filtrar() {
    this.escolasService.buscarEscolasPreco(0, this.value);
  }
  onSliderChange(event: any): void {
    this.escolasService.buscarEscolasPreco(0, this.value).subscribe(data => {
      this.escolasService.atualizarListaDeEscolasObservable(data);
      this.filtroAtualizado.emit(data)
    });
  }

}
