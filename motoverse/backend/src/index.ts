import express from 'express';
import cors from 'cors';
import path from 'path';
import uploadRouter from './routes/upload';

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use('/images-estoque', express.static(path.join(__dirname, '../public/images-estoque')));

// Rotas
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 