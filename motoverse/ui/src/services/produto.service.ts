import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3001/produtos';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro na requisição:', error);
    let errorMessage = 'Ocorreu um erro na requisição';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  cadastrarProduto(produto: any, imagem: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagem', imagem);
    formData.append('produto', JSON.stringify(produto));

    console.log('Enviando dados para o servidor:', {
      produto: produto,
      imagem: imagem.name
    });

    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }
} 