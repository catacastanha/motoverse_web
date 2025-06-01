import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuService } from './services/menu.service';
import { MenuOverlayComponent } from './menu-overlay/menu-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, MenuOverlayComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    public menuService: MenuService
  ) {}
}
