import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FiltrosComponent } from './filtros/filtros.component';

@Component({
  selector: 'app-estoque',
  imports: [CommonModule, RouterLink, FiltrosComponent],
  templateUrl: './estoque.component.html',
})
export class EstoqueComponent {
  @ViewChild('filtros') filtros!: FiltrosComponent;
  ordenacaoAtual: 'asc' | 'desc' = 'asc';
  filtrosAtivos = false;
  motosFiltradas: any[] = [];

  motos = [
    {
      id: 1,
      nome: 'Honda CG 160 Titan 2025',
      imagem: '/images-estoque/cg160.png',
      precoAntigo: 21100,
      precoAtual: 19556,
      km: 0,
      ano: 2025,
    },
    {
      id: 2,
      nome: 'Honda XRE 190 2025',
      imagem: '/images-estoque/xre190.png',
      precoAntigo: 24460,
      precoAtual: 23913,
      km: 0,
      ano: 2025,
    },
    {
      id: 3,
      nome: 'Yamaha MT-03 2025',
      imagem: '/images-estoque/mt03.png',
      precoAntigo: 35700,
      precoAtual: 33920.90,
      km: 0,
      ano: 2025,
    },
    {
      id: 4,
      nome: 'Bajaj Dominar 400 2025',
      imagem: '/images-estoque/dominar400.png',
      precoAtual: 26350,
      km: 0,
      ano: 2025,
    },
    {
      id: 5,
      nome: 'BMW GS 310 2025',
      imagem: '/images-estoque/310gs.png',
      precoAtual: 39500,
      km: 0,
      ano: 2025,
    },
    {
      id: 6,
      nome: 'Triumph Tiger 1200 2025',
      imagem: '/images-estoque/tiger1200.png',
      precoAtual: 88990,
      km: 0,
      ano: 2025
    },
  ];

  constructor() {
    this.motosFiltradas = [...this.motos];
  }

  ordenarMotos() {
    this.ordenacaoAtual = this.ordenacaoAtual === 'asc' ? 'desc' : 'asc';
    this.motosFiltradas.sort((a, b) => {
      if (this.ordenacaoAtual === 'asc') {
        return a.nome.localeCompare(b.nome);
      } else {
        return b.nome.localeCompare(a.nome);
      }
    });
  }

  aplicarFiltros(filtros: any) {
    this.motosFiltradas = this.motos.filter(moto => {
      const matchModelo = !filtros.modelo || 
        moto.nome.toLowerCase().includes(filtros.modelo.toLowerCase());
      
      const matchMarca = !filtros.marca || 
        moto.nome.toLowerCase().includes(filtros.marca.toLowerCase());
      
      const matchKm = !filtros.kmMax || 
        moto.km <= filtros.kmMax;
      
      const matchPrecoMin = !filtros.precoMin || 
        moto.precoAtual >= filtros.precoMin;
      
      const matchPrecoMax = !filtros.precoMax || 
        moto.precoAtual <= filtros.precoMax;

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