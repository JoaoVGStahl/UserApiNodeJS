// src/domain/repositories/UserRepository.ts

import { pool } from '../../infra/database';
import { User } from '../models/User';


export class UserRepository {
    async findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users', (error: any, results: User[] | PromiseLike<User[]>) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async findById(id: number): Promise<User | null> {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM users WHERE id = ?', [id], (error: any, results: string | any[]) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    async create(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO users SET ?', user, (error: any, results: { insertId: any; }) => {
                if (error) {
                    reject(error);
                } else {
                    const createdUser: User = { ...user, id: results.insertId};
                    resolve(createdUser);
                }
            });
        });
    }

    async update(user: User): Promise<User | null> {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE users SET nome = ?, senha = ? WHERE id = ?', [user.nome, user.senha, user.id], (error: any, results: { affectedRows: number; }) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.affectedRows > 0) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    async delete(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE users SET deletado = 1 WHERE id = ?', [id], (error: any, results: { affectedRows: number; }) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }
}
