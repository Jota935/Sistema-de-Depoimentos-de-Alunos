require('dotenv').config();
const express = require('express');
const depoimentosRoutes = require('./src/routes/depoimentos.routes');
const errorHandler = require('./src/middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Sistema de Depoimentos de Alunos',
    endpoints: {
      publico: '/api/depoimentos',
      admin: '/api/admin/depoimentos'
    }
  });
});

app.use('/api', depoimentosRoutes);

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
