export interface Usuario {
    id: number;
    nome: string;
    cpf: string;
    celular: string;
    senha: string;
    tipo: 'admin' | 'usuario';
} 