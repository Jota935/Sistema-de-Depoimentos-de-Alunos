function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenValido = process.env.API_TOKEN || 'token123';

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  if (token !== tokenValido) {
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }

  next();
}

module.exports = autenticarToken;
