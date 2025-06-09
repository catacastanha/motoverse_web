import { Injectable } from '@angular/core';
import { Moto } from '../interfaces/moto.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  private baseUrl = environment.url;

  constructor(private http: HttpClient) { }

  getMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(`${this.baseUrl}/produtos`);
  }

  getMotoById(id: number): Observable<Moto> {
    return this.http.get<Moto>(`${this.baseUrl}/produtos/${id}`);
  }

  adicionarMoto(moto: Moto): Observable<Moto> {
    return this.http.post<Moto>(`${this.baseUrl}/produtos`, moto);
  }

  atualizarMoto(moto: Moto): Observable<Moto> {
    return this.http.put<Moto>(`${this.baseUrl}/produtos/${moto.id}`, moto);
  }

  excluirMoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/produtos/${id}`);
  }
}
