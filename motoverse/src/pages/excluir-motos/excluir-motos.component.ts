import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-excluir-motos',
  imports: [RouterLink, CommonModule],
  templateUrl: './excluir-motos.component.html'
})
export class ExcluirMotosComponent {

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
    
  
}
