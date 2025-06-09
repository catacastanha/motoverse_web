import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FiltrosComponent } from './filtros/filtros.component';
import { MotoService } from '../../app/services/moto.service'; 
import { Moto } from '../../app/interfaces/moto.interface';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
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

  constructor(private motoService: MotoService) {}

  ngOnInit(): void {
    this.carregarMotos();
  }

  carregarMotos() {
    this.carregando = true;
    this.motoService.getMotos().subscribe({
      next: (dados) => {
        this.motos = dados;
        this.motosFiltradas = [...this.motos];
        this.carregando = false;
        this.ordenarMotos('asc');
      },
      error: (err) => {
        this.erro = 'Erro ao carregar motos.';
        this.carregando = false;
        console.error(err);
      }
    });
  }

  ordenarMotos(direcao?: 'asc' | 'desc') {
    if (direcao) {
      this.ordenacaoAtual = direcao;
    }
    this.motosFiltradas.sort((a, b) => {
      if (this.ordenacaoAtual === 'asc') {
        return a.marca.localeCompare(b.marca);
      } else {
        return b.marca.localeCompare(a.marca);
      }
    });
  }

  aplicarFiltros(filtros: any) {
    this.motosFiltradas = this.motos.filter(moto => {
      const matchModelo = !filtros.modelo || 
        moto.modelo.toLowerCase().includes(filtros.modelo.toLowerCase());

      const matchMarca = !filtros.marca || 
        moto.marca.toLowerCase().includes(filtros.marca.toLowerCase());

      const matchKm = !filtros.kmMax || 
        moto.km <= filtros.kmMax;

      const matchPrecoMin = !filtros.precoMin || 
        moto.valor >= filtros.precoMin;

      const matchPrecoMax = !filtros.precoMax || 
        moto.valor <= filtros.precoMax;

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
