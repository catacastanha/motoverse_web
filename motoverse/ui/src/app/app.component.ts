import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  menuAberto = false;

  constructor(public authService: AuthService) {}

  abreMenu() {
    this.menuAberto = !this.menuAberto;
  }
}
