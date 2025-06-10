import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FiltrosComponent } from './filtros/filtros.component';
import { MotoService } from '../../app/services/moto.service'; 
import { Moto } from '../../app/interfaces/moto.interface';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, FiltrosComponent],
  templateUrl: './estoque.component.html',
})
export class EstoqueComponent implements OnInit {
  @ViewChild('filtros') filtros!: FiltrosComponent;
  ordenacaoAtual: 'asc' | 'desc' = 'asc';
  filtrosAtivos = false;
  
  motos: Moto[] = [];          
  motosFiltradas: Moto[] = []; 

  carregando = true;
  erro = '';

  constructor(
    private motoService: MotoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarMotos();
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.filtrarPorBusca(params['search']);
      }
    });
  }

  carregarMotos() {
    this.carregando = true;
    this.motoService.getMotos().subscribe({
      next: (dados) => {
        this.motos = dados;
        this.motosFiltradas = [...this.motos];
        this.carregando = false;
        this.route.queryParams.subscribe(params => {
          if (params['search']) {
            this.filtrarPorBusca(params['search']);
          }
        });
        this.ordenarMotos('asc');
      },
      error: (err) => {
        this.erro = 'Erro ao carregar motos.';
        this.carregando = false;
        console.error(err);
      }
    });
  }

  filtrarPorBusca(termo: string) {
    if (!termo) {
      this.motosFiltradas = [...this.motos];
      return;
    }
    
    const termoBusca = termo.toLowerCase().trim();
    this.motosFiltradas = this.motos.filter(moto => {
      const marca = moto.marca ? moto.marca.toLowerCase() : '';
      const modelo = moto.modelo ? moto.modelo.toLowerCase() : '';

      return marca.includes(termoBusca) ||
             modelo.includes(termoBusca);
    });
    this.filtrosAtivos = true;
    this.ordenarMotos();
  }

  ordenarMotos(direcao?: 'asc' | 'desc') {
    if (direcao) {
      this.ordenacaoAtual = direcao;
    }
    this.motosFiltradas.sort((a, b) => {
      const marcaA = a.marca || '';
      const marcaB = b.marca || '';

      if (this.ordenacaoAtual === 'asc') {
        return marcaA.localeCompare(marcaB);
      } else {
        return marcaB.localeCompare(marcaA);
      }
    });
  }

  aplicarFiltros(filtros: any) {
    this.motosFiltradas = this.motos.filter(moto => {
      const matchModelo = !filtros.modelo || 
        (moto.modelo ? moto.modelo.toLowerCase().includes(filtros.modelo.toLowerCase()) : false);

      const matchMarca = !filtros.marca || 
        (moto.marca ? moto.marca.toLowerCase().includes(filtros.marca.toLowerCase()) : false);

      const matchKm = !filtros.kmMax || 
        (moto.km !== undefined && moto.km !== null ? moto.km <= filtros.kmMax : false);

      const matchPrecoMin = !filtros.precoMin || 
        (moto.valor !== undefined && moto.valor !== null ? moto.valor >= filtros.precoMin : false);

      const matchPrecoMax = !filtros.precoMax || 
        (moto.valor !== undefined && moto.valor !== null ? moto.valor <= filtros.precoMax : false);

      return matchModelo && matchMarca && matchKm && matchPrecoMin && matchPrecoMax;
    });

    this.filtrosAtivos = Object.values(filtros).some(value => value !== '' && value !== null);
    this.ordenarMotos();
  }

  limparFiltros() {
    this.motosFiltradas = [...this.motos];
    this.filtrosAtivos = false;
    this.filtros.limparFiltros();
    this.ordenarMotos();
  }
}
