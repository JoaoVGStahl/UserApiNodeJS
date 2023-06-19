// src/infra/routes.ts

import { Router, Request, Response } from 'express';
import { UserService } from '../service/UserService';

const router: Router = Router();
const userService: UserService = new UserService();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

router.get('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
});

router.post('/users', async (req: Request, res: Response) => {
  try {
    const { nome, senha } = req.body;
    const user = await userService.createUser(nome, senha);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, senha } = req.body;

  try {
    const updatedUser = await userService.updateUser(id, nome, senha);

    if (!updatedUser) {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    } else {
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      res.status(400).json({ message: 'Erro ao deletar usuário.' });
    } else {
      res.json({ message: 'Usuário excluído com sucesso.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário.' });
  }
});

export default router;
