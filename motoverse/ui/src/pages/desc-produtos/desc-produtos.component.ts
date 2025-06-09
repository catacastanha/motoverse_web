import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MotoService } from '../../app/services/moto.service';
import { Moto } from '../../app/interfaces/moto.interface'; // Novo caminho para a interface

@Component({
  selector: 'app-desc-produtos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './desc-produtos.component.html',
})
export class DescProdutosComponent implements OnInit {
  moto?: Moto;

  constructor(
    private route: ActivatedRoute,
    private motoService: MotoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.motoService.getMotoById(id).subscribe((moto: Moto) => {
        this.moto = {
          id: moto.id,
          marca: moto.marca ?? '',
          modelo: moto.modelo ?? '',
          imagem: moto.imagem ?? '',
          precoAntigo: moto.precoAntigo,
          valor: moto.valor ?? 0,
          km: moto.km ?? 0,
          anoLancamento: moto.anoLancamento ?? 0,
          descricao: moto.descricao ?? ''
        };
      });
    });
  }
}
