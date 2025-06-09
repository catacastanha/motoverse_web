export interface Moto {
  id: number;
  marca: string;
  modelo: string;
  anoLancamento: number; 
  quantidade?: number; 
  descricao: string;
  imagem: string;
  valor: number;       
  precoAntigo?: number; 
  km: number;          
}
