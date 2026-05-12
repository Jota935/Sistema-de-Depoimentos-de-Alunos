function validarCamposObrigatorios(...campos) {
  return (req, res, next) => {
    for (const campo of campos) {
      const valor = req.body[campo];
      if (valor === undefined || valor === null || valor === '') {
        return res.status(400).json({
          mensagem: `O campo '${campo}' é obrigatório.`
        });
      }
    }
    next();
  };
}

function minimoDeCaracteres(campo, tamanhoMinimo) {
  return (req, res, next) => {
    const valor = req.body[campo];

    if (typeof valor !== 'string') {
      return res.status(400).json({
        mensagem: `O campo '${campo}' deve ser um texto.`
      });
    }

    if (valor.trim().length < tamanhoMinimo) {
      return res.status(400).json({
        mensagem: `O campo '${campo}' deve ter pelo menos ${tamanhoMinimo} caracteres.`
      });
    }

    next();
  };
}

function validarNota(req, res, next) {
  const { nota } = req.body;

  if (typeof nota !== 'number' || nota < 1 || nota > 5) {
    return res.status(400).json({
      mensagem: "O campo 'nota' deve ser um número entre 1 e 5."
    });
  }

  next();
}

function validarStatus(req, res, next) {
  const { status } = req.body;
  const statusPermitidos = ['pendente', 'aprovado', 'rejeitado'];

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({
      mensagem: "O campo 'status' deve ser: pendente, aprovado ou rejeitado."
    });
  }

  next();
}

module.exports = {
  validarCamposObrigatorios,
  minimoDeCaracteres,
  validarNota,
  validarStatus
};
