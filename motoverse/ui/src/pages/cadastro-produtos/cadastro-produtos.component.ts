import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {
  produto = {
    marca: '',
    modelo: '',
    ano: '',
    quilometragem: '',
    preco: '',
    quantidade: 1,
    anoLancamento: 2025,
    descricao: '',
    valor: 0,
    km: 0
  };
  imagemSelecionada: File | null = null;
  nomeArquivo: string = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];
      this.nomeArquivo = this.imagemSelecionada.name;
      console.log('Arquivo selecionado:', this.imagemSelecionada);
    }
  }

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Produto:', this.produto);
    console.log('Imagem:', this.imagemSelecionada);

    // Validação dos campos
    if (!this.produto.marca || !this.produto.modelo || !this.produto.ano || !this.produto.quilometragem || !this.produto.preco) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Converter preço e quilometragem para número
    this.produto.valor = Number(this.produto.preco);
    this.produto.km = Number(this.produto.quilometragem);

    if (this.imagemSelecionada) {
      console.log('Enviando dados para o servidor...');
      this.produtoService.cadastrarProduto(this.produto, this.imagemSelecionada)
        .subscribe({
          next: (response) => {
            console.log('Resposta do servidor:', response);
            if (response.success) {
              alert('Produto cadastrado com sucesso!');
              this.router.navigate(['/estoque']);
            } else {
              alert('Erro ao cadastrar produto: ' + response.message);
            }
          },
          error: (error) => {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto. Detalhes: ' + (error.error?.message || error.message));
          }
        });
    } else {
      alert('Por favor, selecione uma imagem.');
    }
  }
}
