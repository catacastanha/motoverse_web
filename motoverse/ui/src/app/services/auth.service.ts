import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();
  private baseUrl = environment.url;

  constructor(private http: HttpClient) {
    const storedUser = sessionStorage.getItem('usuarioAtual');
    if (storedUser) {
      this.usuarioAtualSubject.next(JSON.parse(storedUser));
    }
  }

  login(cpf: string, senha: string): Observable<Usuario | undefined> {
    return this.http.post<any>(`${this.baseUrl}/login`, { cpf, senha }).pipe(
      map(response => {
        if (response.success && response.usuario) {
          this.usuarioAtualSubject.next(response.usuario);
          sessionStorage.setItem('usuarioAtual', JSON.stringify(response.usuario));
          return response.usuario;
        } else {
          return undefined;
        }
      }),
      catchError(error => {
        console.error('Erro de login no serviço:', error);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.usuarioAtualSubject.next(null);
    sessionStorage.removeItem('usuarioAtual');
  }

  isAdmin(): boolean {
    const usuario = this.usuarioAtualSubject.value;
    return usuario?.tipo === 'admin';
  }

  isLoggedIn(): boolean {
    return this.usuarioAtualSubject.value !== null;
  }
} 