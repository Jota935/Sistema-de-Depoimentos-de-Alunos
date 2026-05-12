function errorHandler(err, req, res, next) {
  console.error('Erro:', err.message);

  const status = err.status || 500;
  const mensagem = status === 500 ? 'Erro interno do servidor.' : err.message;

  res.status(status).json({ mensagem });
}

module.exports = errorHandler;
