import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-overlay',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="menuService.menuAberto$ | async" 
         class="fixed inset-0 bg-[var(--color-quatro)] z-50 flex flex-col items-center justify-center gap-6">
      <!-- Botão do menu no topo -->
      <div class="absolute top-4 right-4">
        <label class="relative z-50">
          <div class="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
            <input class="hidden peer z-auto" type="checkbox" 
                   [checked]="menuService.getMenuState()" 
                   (change)="menuService.toggleMenu()" />
            <div class="w-[50%] h-[2px] bg-[var(--color-um)] rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]">
            </div>
            <div class="w-[50%] h-[2px] bg-[var(--color-um)] rounded-md transition-all duration-300 origin-center peer-checked:hidden">
            </div>
            <div class="w-[50%] h-[2px] bg-[var(--color-um)] rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]">
            </div>
          </div>
        </label>
      </div>

      <!-- Links do menu -->
      <nav class="flex flex-col items-center gap-6 text-[var(--color-um)]">
        <a [routerLink]="['/']" routerLinkActive="font-bold" (click)="menuService.fecharMenu()" 
           class="hover:font-bold transition duration-1000">Início</a>
        <a [routerLink]="['estoque']" routerLinkActive="font-bold" (click)="menuService.fecharMenu()" 
           class="hover:font-bold">Estoque</a>
        <a [routerLink]="['login']" routerLinkActive="font-bold" (click)="menuService.fecharMenu()" 
           class="hover:font-bold">Login</a>
        <a [routerLink]="['cadastro']" routerLinkActive="font-bold" (click)="menuService.fecharMenu()" 
           class="hover:font-bold">Cadastro</a>
        <ng-container *ngIf="authService.isAdmin()">
          <a [routerLink]="['cadastro-produtos']" routerLinkActive="font-bold" (click)="menuService.fecharMenu()" 
             class="hover:font-bold">Cadastrar Moto</a>
          <a [routerLink]="['excluir-motos']" routerLinkActive="font-bold" (click)="menuService.fecharMenu()" 
             class="hover:font-bold">Gerenciar Motos</a>
        </ng-container>
      </nav>
    </div>
  `
})
export class MenuOverlayComponent {
  constructor(
    public menuService: MenuService,
    public authService: AuthService
  ) {}
} 