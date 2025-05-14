import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('inputSenha') inputSenhaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('toggleSenha') toggleSenhaRef!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    const inputSenha = this.inputSenhaRef.nativeElement;
    const toggleSenha = this.toggleSenhaRef.nativeElement;

    inputSenha.type = 'password';

    toggleSenha.addEventListener('change', () => {
      inputSenha.type = toggleSenha.checked ? 'text' : 'password';
    });
  }
}

