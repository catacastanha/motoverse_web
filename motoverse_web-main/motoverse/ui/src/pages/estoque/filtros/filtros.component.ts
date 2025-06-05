import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" *ngIf="isOpen">
      <div class="bg-[var(--color-cinco)] p-6 rounded-lg w-[90%] max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-[var(--color-um)]">Filtros</h2>
          <button (click)="fecharFiltros()" class="text-[var(--color-um)]">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Modelo -->
          <div>
            <label class="block text-[var(--color-um)] mb-2">Modelo</label>
            <input type="text" [(ngModel)]="filtros.modelo" 
                   class="w-full p-2 rounded border border-gray-300 bg-white text-[var(--color-um)]"
                   placeholder="Ex: CG 160">
          </div>

          <!-- Marca -->
          <div>
            <label class="block text-[var(--color-um)] mb-2">Marca</label>
            <select [(ngModel)]="filtros.marca" 
                    class="w-full p-2 rounded border border-gray-300 bg-white text-[var(--color-um)]">
              <option value="">Todas as marcas</option>
              <option value="Avelloz">Avelloz</option>
              <option value="Bajaj">Bajaj</option>
              <option value="BMW">BMW</option>
              <option value="Bull Motors">Bull Motors</option>
              <option value="Dafra">Dafra</option>
              <option value="Ducati">Ducati</option>
              <option value="Haojue">Haojue</option>
              <option value="Harley-Davidson">Harley-Davidson</option>
              <option value="Honda">Honda</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="KTM">KTM</option>
              <option value="MV Agusta">MV Agusta</option>
              <option value="MXF">MXF</option>
              <option value="Origem">Origem</option>
              <option value="Piaggio">Piaggio</option>
              <option value="Royal Enfield">Royal Enfield</option>
              <option value="Shineray">Shineray</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Triumph">Triumph</option>
              <option value="Voltz Motors">Voltz Motors</option>
              <option value="Watts">Watts</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Zontes">Zontes</option>
            </select>
          </div>

          <!-- Quilometragem -->
          <div>
            <label class="block text-[var(--color-um)] mb-2">Quilometragem Máxima</label>
            <input type="number" [(ngModel)]="filtros.kmMax" 
                   class="w-full p-2 rounded border border-gray-300 bg-white text-[var(--color-um)]"
                   placeholder="Ex: 10000">
          </div>

          <!-- Faixa de Preço -->
          <div>
            <label class="block text-[var(--color-um)] mb-2">Faixa de Preço</label>
            <div class="flex gap-2">
              <input type="number" [(ngModel)]="filtros.precoMin" 
                     class="w-1/2 p-2 rounded border border-gray-300 bg-white text-[var(--color-um)]"
                     placeholder="Mín">
              <input type="number" [(ngModel)]="filtros.precoMax" 
                     class="w-1/2 p-2 rounded border border-gray-300 bg-white text-[var(--color-um)]"
                     placeholder="Máx">
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button (click)="limparFiltros()" 
                  class="px-4 py-2 rounded bg-gray-200 text-[var(--color-um)]">
            Limpar
          </button>
          <button (click)="aplicarFiltros()" 
                  class="px-4 py-2 rounded bg-[var(--color-um)] text-white">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  `
})
export class FiltrosComponent {
  @Output() filtrosAplicados = new EventEmitter<any>();
  isOpen = false;

  filtros = {
    modelo: '',
    marca: '',
    kmMax: null as number | null,
    precoMin: null as number | null,
    precoMax: null as number | null
  };

  abrirFiltros() {
    this.isOpen = true;
  }

  fecharFiltros() {
    this.isOpen = false;
  }

  limparFiltros() {
    this.filtros = {
      modelo: '',
      marca: '',
      kmMax: null,
      precoMin: null,
      precoMax: null
    };
  }

  aplicarFiltros() {
    this.filtrosAplicados.emit(this.filtros);
    this.fecharFiltros();
  }
} 