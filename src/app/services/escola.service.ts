import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Escola } from '../models/escola-model';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private apiUrl = 'http://127.0.0.1:5000/api/escolas'; 

  private escolasSubject = new BehaviorSubject<Escola[]>([]);
  escolas$ = this.escolasSubject.asObservable();

  constructor(private http: HttpClient) { }


  getEscolas(): Observable<Escola[]> {
    return this.http.get<Escola[]>(this.apiUrl);
  }

  cadastrarEscola(escola: Escola): Observable<Escola> {
    return this.http.post<Escola>(this.apiUrl, escola);
  }


  atualizarEscolas(id: number, escola: Escola): Observable<Escola> {
    return this.http.put<Escola>(`${this.apiUrl}/${id}`, escola);
  }

  buscarEnderecoPorCep(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }
  getEscolaById(id: number): Observable<Escola> {
    return this.http.get<Escola>(`${this.apiUrl}/${id}`);
    
  }
  deleteEscola(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  filtrarEscolasPorPreco(minPreco: number, maxPreco: number): Observable<Escola[]> {
    const url = `${this.apiUrl}/filtro/preco?min_preco=${minPreco}&max_preco=${maxPreco}`;
    return this.http.get<Escola[]>(url);
  }

  atualizarListaDeEscolasObservable(escolas: Escola[]) {
    this.escolasSubject.next(escolas);
  }
  buscarEscolasPreco(minPreco: number, maxPreco: number): Observable<Escola[]> {
    const url = `${this.apiUrl}/filtro/preco?min_preco=${minPreco}&max_preco=${maxPreco}`;
    return this.http.get<Escola[]>(url);
  }
  buscarEscolasPorMetodologia(metodologia: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/filtro/metodologia?metodologia=${metodologia}`);
  }
}
