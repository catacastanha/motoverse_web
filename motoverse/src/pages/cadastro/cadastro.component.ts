import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../app/services/usuario.service';
import { Usuario } from '../../app/interfaces/usuario.interface';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './cadastro.component.html',
})

export class CadastroComponent implements AfterViewInit {
  @ViewChild('inputSenha') inputSenhaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('toggleSenha') mostraSenhaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputCpf') inputCpfRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputCelular') numCelular!: ElementRef<HTMLInputElement>;

  usuario: Usuario = {
    id: 0,
    nome: '',
    cpf: '',
    celular: '',
    senha: '',
    tipo: 'usuario'
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    const inputSenha = this.inputSenhaRef.nativeElement;
    const mostraSenha = this.mostraSenhaRef.nativeElement;
    const numCelular = this.numCelular.nativeElement;

    inputSenha.type = 'password';

    mostraSenha.addEventListener('change', () => {
      inputSenha.type = mostraSenha.checked ? 'text' : 'password';
    });

    const inputCpf = this.inputCpfRef.nativeElement;

    inputCpf.addEventListener('input', () => {
      let valor = inputCpf.value.replace(/\D/g, '');
      if (valor.length > 11) valor = valor.substring(0, 11);

      //000.000.000-00
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      inputCpf.value = valor;
      this.usuario.cpf = valor;
    });

    numCelular.addEventListener('input', () => {
      let valor = numCelular.value.replace(/\D/g, '');
      if (valor.length > 11) valor = valor.substring(0, 11);

      //(00) 00000-0000
      valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

      numCelular.value = valor;
      this.usuario.celular = valor;
    });
  }

  cadastrar(): void {
    if (this.validarFormulario()) {
      this.usuarioService.cadastrarUsuario(this.usuario).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          alert('Erro ao realizar cadastro. Tente novamente.');
        }
      });
    }
  }

  private validarFormulario(): boolean {

    if (this.usuario.cpf.length !== 14) {
      alert('CPF inválido.');
      return false;
    }

    if (this.usuario.celular.length !== 15) {
      alert('Número de celular inválido.');
      return false;
    }

    if (this.usuario.senha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    return true;
  }
}
