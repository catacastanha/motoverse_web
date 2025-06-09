import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FiltrosExcluirComponent } from './filtros/filtros.component';

interface Moto {
  id: number;
  marca: string;
  modelo: string;
  quantidade: number;
  anoLancamento: number;
  descricao: string;
  imagem: string;
  valor: number;
  precoAntigo?: number;
  km: number;
}

@Component({
  selector: 'app-excluir-motos',
  standalone: true,
  imports: [CommonModule, FiltrosExcluirComponent],
  templateUrl: './excluir-motos.component.html'
})
export class ExcluirMotosComponent implements OnInit, AfterViewInit {
    @ViewChild('filtros') filtros!: FiltrosExcluirComponent;
    mostrarDialogoConfirmacao = false;
    motoParaExcluir: Moto | null = null;
    quantidadeExclusao: number = 1;
    motos: Moto[] = [];
    motosFiltradas: Moto[] = [];
    ordenacaoAtual: 'asc' | 'desc' = 'asc';
    filtrosAtivos = false;
    carregando = true;
    erro: string | null = null;

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.carregarMotos();
    }

    ngAfterViewInit() {
      // Opcional: console.log para verificar se o filtros está disponível
      // console.log('Filtros component available:', this.filtros);
    }

    abrirFiltrosClick() {
      if (this.filtros) {
        this.filtros.abrirFiltros();
      } else {
        console.warn('Filtros component not yet available.');
      }
    }

    carregarMotos() {
      this.carregando = true;
      this.erro = null;
      this.http.get<Moto[]>('http://localhost:3001/produtos').subscribe(
        (data) => {
          this.motos = data;
          this.motosFiltradas = [...this.motos];
          this.ordenarMotos('asc');
          this.carregando = false;
        },
        (error) => {
          console.error('Erro ao carregar motos:', error);
          this.erro = 'Erro ao carregar motos. Tente novamente mais tarde.';
          this.carregando = false;
        }
      );
    }

    abrirDialogoExclusao(moto: Moto) {
      this.motoParaExcluir = moto;
      this.quantidadeExclusao = 1;
      this.mostrarDialogoConfirmacao = true;
    }

    fecharDialogoExclusao() {
      this.mostrarDialogoConfirmacao = false;
      this.motoParaExcluir = null;
      this.quantidadeExclusao = 1;
    }

    confirmarExclusao() {
      if (this.motoParaExcluir) {
        const novaQuantidade = this.motoParaExcluir.quantidade - this.quantidadeExclusao;
        
        if (novaQuantidade <= 0) {
          // Se a quantidade for 0 ou negativa, remove o produto
          this.http.delete(`http://localhost:3001/produtos/${this.motoParaExcluir.id}`).subscribe(
            () => {
              this.motos = this.motos.filter(moto => moto.id !== this.motoParaExcluir?.id);
              this.motosFiltradas = this.motosFiltradas.filter(moto => moto.id !== this.motoParaExcluir?.id);
              this.fecharDialogoExclusao();
            },
            (error) => {
              console.error('Erro ao excluir moto:', error);
            }
          );
        } else {
          // Atualiza a quantidade do produto
          const motoAtualizada = { ...this.motoParaExcluir, quantidade: novaQuantidade };
          this.http.patch(`http://localhost:3001/produtos/${this.motoParaExcluir.id}`, motoAtualizada).subscribe(
            () => {
              const index = this.motos.findIndex(moto => moto.id === this.motoParaExcluir?.id);
              if (index !== -1) {
                this.motos[index] = motoAtualizada;
                this.motosFiltradas = [...this.motos];
                if (this.filtros) {
                  this.aplicarFiltros(this.filtros.filtros);
                }
              }
              this.fecharDialogoExclusao();
            },
            (error) => {
              console.error('Erro ao atualizar quantidade:', error);
            }
          );
        }
      }
    }

    aumentarQuantidade() {
      if (this.motoParaExcluir && this.quantidadeExclusao < this.motoParaExcluir.quantidade) {
        this.quantidadeExclusao++;
      }
    }

    diminuirQuantidade() {
      if (this.quantidadeExclusao > 1) {
        this.quantidadeExclusao--;
      }
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
      if (this.filtros) {
        this.filtros.limparFiltros();
      }
      this.ordenarMotos();
    }
}
