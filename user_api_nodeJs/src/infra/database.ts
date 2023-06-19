// src/infra/database.ts

import { createPool, Pool, PoolConfig } from 'mysql';

const dbConfig: PoolConfig = {
  host: 'localhost',
  user: 'root',
  password: 'eventos610rib5',
  database: 'users',
  port: 3306,
};

export const pool: Pool = createPool(dbConfig);
