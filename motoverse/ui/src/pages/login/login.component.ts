import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('inputSenha') inputSenhaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('toggleSenha') mostraSenhaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputCpf') inputCpfRef!: ElementRef<HTMLInputElement>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    const inputSenha = this.inputSenhaRef.nativeElement;
    const mostraSenha = this.mostraSenhaRef.nativeElement;

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
    });
  }

  onSubmit(): void {
    const cpf = this.inputCpfRef.nativeElement.value;
    const senha = this.inputSenhaRef.nativeElement.value;

    this.authService.login(cpf, senha).subscribe(usuario => {
      if (usuario) {
        this.router.navigate(['/']);
      }
    });
  }
}
