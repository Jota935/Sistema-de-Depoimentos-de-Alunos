const depoimentosModel = require('../models/depoimentos.model');

function listarPublicos(req, res) {
  const depoimentos = depoimentosModel.listarAprovados();
  res.json(depoimentos);
}

function listarAdmin(req, res) {
  const depoimentos = depoimentosModel.listarTodos();
  res.json(depoimentos);
}

function obterPorId(req, res) {
  const id = Number(req.params.id);
  const depoimento = depoimentosModel.buscarPorId(id);

  if (!depoimento) {
    return res.status(404).json({ mensagem: 'Depoimento não encontrado.' });
  }

  res.json(depoimento);
}

function criar(req, res) {
  const { nomeAluno, curso, mensagem, nota } = req.body;

  const novoDepoimento = depoimentosModel.criar({
    nomeAluno,
    curso,
    mensagem,
    nota
  });

  res.status(201).json({
    mensagem: 'Depoimento criado com sucesso.',
    dados: novoDepoimento
  });
}

function atualizar(req, res) {
  const id = Number(req.params.id);
  const { nomeAluno, curso, mensagem, nota } = req.body;

  const depoimentoAtualizado = depoimentosModel.atualizar(id, {
    nomeAluno,
    curso,
    mensagem,
    nota
  });

  if (!depoimentoAtualizado) {
    return res.status(404).json({ mensagem: 'Depoimento não encontrado.' });
  }

  res.json({
    mensagem: 'Depoimento atualizado com sucesso.',
    dados: depoimentoAtualizado
  });
}

function atualizarStatus(req, res) {
  const id = Number(req.params.id);
  const { status } = req.body;

  const depoimento = depoimentosModel.atualizarStatus(id, status);

  if (!depoimento) {
    return res.status(404).json({ mensagem: 'Depoimento não encontrado.' });
  }

  res.json({
    mensagem: 'Status atualizado com sucesso.',
    dados: depoimento
  });
}

function remover(req, res) {
  const id = Number(req.params.id);
  const removido = depoimentosModel.remover(id);

  if (!removido) {
    return res.status(404).json({ mensagem: 'Depoimento não encontrado.' });
  }

  res.json({ mensagem: 'Depoimento removido com sucesso.', dados: removido });
}

module.exports = {
  listarPublicos,
  listarAdmin,
  obterPorId,
  criar,
  atualizar,
  atualizarStatus,
  remover
};
