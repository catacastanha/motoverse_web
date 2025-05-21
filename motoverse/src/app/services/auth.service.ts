import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(null);
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor(private usuarioService: UsuarioService) {
    // Recupera o usuário do localStorage ao iniciar
    const usuarioSalvo = localStorage.getItem('usuarioAtual');
    if (usuarioSalvo) {
      this.usuarioAtualSubject.next(JSON.parse(usuarioSalvo));
    }
  }

  login(cpf: string, senha: string): Observable<Usuario | undefined> {
    return new Observable(observer => {
      this.usuarioService.login(cpf, senha).subscribe(usuario => {
        if (usuario) {
          this.usuarioAtualSubject.next(usuario);
          localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
        }
        observer.next(usuario);
        observer.complete();
      });
    });
  }

  logout(): void {
    this.usuarioAtualSubject.next(null);
    localStorage.removeItem('usuarioAtual');
  }

  isAdmin(): boolean {
    const usuario = this.usuarioAtualSubject.value;
    return usuario?.tipo === 'admin';
  }

  isLoggedIn(): boolean {
    return this.usuarioAtualSubject.value !== null;
  }
} 