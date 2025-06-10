import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
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

  constructor() { }

  getUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }

  getUsuarioById(id: number): Observable<Usuario | undefined> {
    return of(this.usuarios.find(usuario => usuario.id === id));
  }


  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    usuario.id = this.usuarios.length + 1;
    usuario.tipo = 'usuario';
    this.usuarios.push(usuario);
    return of(usuario);
  }

  atualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const index = this.usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
      this.usuarios[index] = usuario;
    }
    return of(usuario);
  }

  excluirUsuario(id: number): Observable<boolean> {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  login(email: string, senha: string): Observable<Usuario | undefined> {
    const usuario = this.usuarios.find(u => u.cpf === email && u.senha === senha);
    return of(usuario);
  }
}