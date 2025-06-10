import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MenuOverlayComponent } from './menu-overlay/menu-overlay.component';
import { MenuService } from './services/menu.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenuOverlayComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  searchTerm: string = '';

  constructor(
    public menuService: MenuService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      if (this.router.url.includes('/estoque')) {
        this.router.navigate([], {
          queryParams: { search: this.searchTerm.trim() },
          queryParamsHandling: 'merge'
        });
      } else {
        this.router.navigate(['/estoque'], {
          queryParams: { search: this.searchTerm.trim() }
        });
      }
      this.searchTerm = '';
    } else {
      if (this.router.url.includes('/estoque')) {
        this.router.navigate([], {
          queryParams: { search: null },
          queryParamsHandling: 'merge'
        });
      }
    }
  }
}
