// src/service/UserService.ts

import { User } from '../domain/models/User';
import { UserRepository } from '../domain/repositories/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(nome: string, senha: string): Promise<void> {
    try {
      if (!nome || !senha) {
        throw new Error('Nome e senha são campos obrigatórios');
      }

      if (senha.length < 8) {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      }

      // Restante do código para salvar o usuário no repositório
      const newUser: User = {
        id: 0,
        nome,
        senha,
        deletado: false,
        dataCadastro: new Date(),
      };

      await this.userRepository.create(newUser);
    } catch (error) {

    }

  }

  async updateUser(id: number, nome: string, senha: string): Promise<User | null> {
    const updatedUser: User = {
      id,
      nome,
      senha,
      deletado: false,
      dataCadastro: new Date(),
    };

    return this.userRepository.update(updatedUser);
  }

  async deleteUser(userId: number): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await this.userRepository.delete(user.id);
  }
}
