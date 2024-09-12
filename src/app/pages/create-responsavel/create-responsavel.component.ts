import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PaisService } from '../../services/pais.service';
import { NotificationService } from '../../services/notification.service';
import { Pais } from '../../models/pais-models';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-responsavel',
  standalone: true,
  templateUrl: './create-responsavel.component.html',
  styleUrls: ['./create-responsavel.component.scss'],
  providers: [PaisService, NotificationService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatCheckboxModule,
    HeaderComponent,
    SweetAlert2Module,
    LoadingComponent,
    MatChipsModule, 
    FormsModule

],
})
export class CreateResponsavelComponent implements OnInit {
  parentForm!: FormGroup;
  isLoading = false;
  messageLoading = 'Salvando dados do responsável...';
  paisId!:number
  isEditMode = false;
  currentId!: number
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.parentForm = this.fb.group({
      nome_completo: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      rua: [{ value: '', disabled: true }],
      numero: ['', Validators.required],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      idade_crianca: ['', [Validators.required, Validators.min(0)]],
      necessidades_especiais: [false],
      email: ['', [Validators.required, Validators.email]]
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentId = +params['id']; 
        this.loadResponsavelWithId(this.currentId); 
      }
    });
  }

  buscarEndereco(): void {
    const cep = this.parentForm?.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.paisService.buscarEnderecoPorCep(cep).subscribe(
        (data) => {
          if (!data.erro) {
            this.parentForm?.patchValue({
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            });
          } else {
            this.snackBar.open('CEP inválido', 'Fechar', { duration: 3000 });
          }
        },
        () => {
          this.snackBar.open('Erro ao buscar endereço', 'Fechar', { duration: 3000 });
        }
      );
    }
  }

  onSubmit(): void {
    if (this.parentForm?.valid) {
      const parentData: Pais = {
        id: 0,
        ...this.parentForm.getRawValue()
      };

      this.isLoading = true;
      if(this.isEditMode){
        this.paisService.atualizarPais(this.currentId,parentData).subscribe(
          () => {
            this.notificationService.showSuccess('Dados atualizado com sucesso com sucesso');
            this.parentForm.reset();
            this.parentForm.markAsPristine();
            this.parentForm.markAsUntouched();
            this.isLoading = false;
            this.router.navigate(['/cadastro-responsaveis']);

          },
          (error) => {
            this.notificationService.showError('Erro ao cadastrar responsável');
            this.isLoading = false;
          }
        );
      }else{
        this.paisService.cadastrarPais(parentData).subscribe(
          () => {
            this.notificationService.showSuccess('Responsável registrado com sucesso');
            this.parentForm.reset();
            this.parentForm.markAsPristine();
            this.parentForm.markAsUntouched();
            this.isLoading = false;
            this.router.navigate(['/cadastro-responsaveis']);
          },
          (error) => {
            this.notificationService.showError('Erro ao cadastrar responsável');
            this.isLoading = false;
          }
        );
      }
   
    }
  }
  loadResponsavelWithId(id: number): void {
    this.isLoading = true;
    this.paisService.getPaisById(id).subscribe(
      (data: Pais) => {
        this.parentForm.patchValue(data); 
        this.isLoading = false;
      },
      error => {
        this.notificationService.showError('Erro ao carregar os dados do responsável');
        this.isLoading = false;
      }
    );
  }

  accessPaisEdit(): void {
    if (this.paisId) {
      this.router.navigate(['/responsaveis/editar', this.paisId]);
    }
  }

  onDelete(){
    if (this.isEditMode && this.currentId) {
      this.paisService.deletePais(this.currentId).subscribe(
        () => {
          this.notificationService.showSuccess('Responsável excluído com sucesso');
          this.router.navigate(['/cadastro-responsaveis']);
        },
        error => {
          this.notificationService.showError('Erro ao excluir responsável');
        }
      );
  }
}
}