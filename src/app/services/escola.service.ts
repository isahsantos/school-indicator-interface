import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escola } from '../models/escola-model';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  private apiUrl = 'http://127.0.0.1:5000/api/escolas'; // URL da sua API

  constructor(private http: HttpClient) { }

  getEscolas(): Observable<Escola[]> {
    return this.http.get<Escola[]>(this.apiUrl);
  }
}
