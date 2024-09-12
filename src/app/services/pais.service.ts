import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais-models';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = 'http://127.0.0.1:5000/api/pais';

  constructor(private http: HttpClient) {}

  cadastrarPais(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, pais);
  }

  atualizarPais(id: number, pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/${id}`, pais);
  }

  buscarEnderecoPorCep(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }
  getPaisById(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`);
  }
  deletePais(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
