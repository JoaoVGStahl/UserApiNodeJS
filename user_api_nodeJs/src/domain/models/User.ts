// src/domain/models/User.ts

export interface User {
    id: number;
    nome: string;
    senha: string;
    deletado: boolean;
    dataCadastro: Date;
}
