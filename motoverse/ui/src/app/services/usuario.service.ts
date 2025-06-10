import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.url;
  private usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'catarina',
      cpf: '150.999.999-99',
      celular: '(31) 97307-1453',
      senha: 'teste123',
      tipo: 'admin'
    },
    {
      id: 2,
      nome: 'teste da silva',
      cpf: '999.999.999-99',
      celular: '(11) 99999-9999',
      senha: 'teste123',
      tipo: 'usuario'
    }
  ];

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  getUsuarioById(id: number): Observable<Usuario | undefined> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`);
  }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios`, usuario);
  }

  atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/${usuario.id}`, usuario);
  }

  excluirUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/usuarios/${id}`);
  }

  login(email: string, senha: string): Observable<Usuario | undefined> {
    return of(this.usuarios.find(u => u.cpf === email && u.senha === senha));
  }
}