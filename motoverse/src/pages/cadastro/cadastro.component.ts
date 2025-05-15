import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './cadastro.component.html',
})

export class CadastroComponent implements AfterViewInit {
  @ViewChild('inputSenha') inputSenhaRef!: ElementRef<HTMLInputElement>;
  @ViewChild('toggleSesnha') toggleSenhaRef!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    const inputSenha = this.inputSenhaRef.nativeElement;
    const toggleSenha = this.toggleSenhaRef.nativeElement;

    inputSenha.type = 'password';

    toggleSenha.addEventListener('change', () => {
      inputSenha.type = toggleSenha.checked ? 'text' : 'password';
    });
  }
}
