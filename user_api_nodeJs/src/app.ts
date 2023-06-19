// app.ts
import express, { Express } from 'express';
import routes from '../src/infra/routes';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
