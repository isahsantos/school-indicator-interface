import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EscolaService } from '../../services/escola.service';
import { CommonModule } from '@angular/common';
import { Escola } from '../../models/escola-model';
import { HeaderComponent } from "../../shared/header/header.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NotificationService } from '../../services/notification.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-school',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    HeaderComponent,
    SweetAlert2Module,
    LoadingComponent,
    MatChipsModule, 
    FormsModule

],
  templateUrl: './create-school.component.html',
  styleUrl: './create-school.component.scss',
  providers:[EscolaService, NotificationService]

})
export class CreateSchoolComponent implements OnInit {
  escolaForm!: FormGroup;
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  isLoading = false;
  messageLoading= 'Salvando dados da escola...'
  schoolId!:number
  isEditMode = false;
  currentId!: number

  constructor(
    private fb: FormBuilder,
    private escolaService: EscolaService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.escolaForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      rua: [{ value: '', disabled: true }],
      numero: ['', Validators.required],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      mensalidade: ['', [Validators.required, Validators.min(0)]],
      quantidade_alunos: ['', [Validators.required, Validators.min(0)]],
      metodologia: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagem_url: ['']
    });
    this.escolaForm.statusChanges.subscribe(status => {
      this.step1Completed = status === 'VALID';
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentId = +params['id']; 
        this.loadSchoolWithId(this.currentId); 
      }
    });
  }

  buscarEndereco(): void {
    const cep = this.escolaForm?.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.escolaService.buscarEnderecoPorCep(cep).subscribe(
        (data) => {
          if (!data.erro) {
            this.escolaForm?.patchValue({
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
    if (this.escolaForm?.valid) {
      const escolaData: Escola = {
        id: 0,
        ...this.escolaForm.getRawValue()
      };
     if(this.isEditMode){
      this.escolaService.atualizarEscolas(this.currentId,escolaData).subscribe(
        () => {
          this.notificationService.showSuccess('Dados atualizado com sucesso com sucesso');
          this.escolaForm.reset();
          this.escolaForm.markAsPristine();
          this.escolaForm.markAsUntouched();
          this.isLoading = false;
          this.router.navigate(['/cadastro-escola']);

        },
        (error) => {
          this.notificationService.showError('Erro ao cadastrar responsável');
          this.isLoading = false;
        }
      );
     }
     else{
      this.escolaService.cadastrarEscola(escolaData).subscribe(
        () => {
          this.isLoading=true
          this.step3Completed = true;  
          this.step1Completed = true;
          this.step2Completed = true
          this.notificationService.showSuccess('Escola registrada');
          this.escolaForm.reset();  
          this.escolaForm.markAsPristine();
          this.escolaForm.markAsUntouched();
          this.isLoading=false

        },
        (error) => {
          this.notificationService.showError('Erro ao cadastrar escola');

        }
      );
     }
      
    }
  }
  accessSchoolEdit(): void {
    if (this.schoolId) {
      this.router.navigate(['/escola/editar', this.schoolId]);
    }
  }
  loadSchoolWithId(id: number): void {
    this.isLoading = true;
    this.escolaService.getEscolaById(id).subscribe(
      (data: Escola) => {
        this.escolaForm.patchValue(data); 
        this.isLoading = false;
      },
      error => {
        this.notificationService.showError('Erro ao carregar os dados da escola');
        this.isLoading = false;
      }
    );
  }
  deleteEscola(){
    if (this.isEditMode && this.currentId) {
      this.escolaService.deleteEscola(this.currentId).subscribe(
        () => {
          this.notificationService.showSuccess('Escola excluída com sucesso');
          this.router.navigate(['/cadastro-responsaveis'])
        },
        error => {
          this.notificationService.showError('Erro ao excluir escola');
        }
      );
  }
  }
  
}
