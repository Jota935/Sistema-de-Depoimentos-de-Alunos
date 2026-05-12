const depoimentos = require('../data/depoimentos.data');

let proximoId = depoimentos.length + 1;

function listarAprovados() {
  return depoimentos.filter((item) => item.status === 'aprovado');
}

function listarTodos() {
  return depoimentos;
}

function buscarPorId(id) {
  return depoimentos.find((item) => item.id === id);
}

function criar(dados) {
  const novoDepoimento = {
    id: proximoId++,
    ...dados,
    status: 'pendente',
    dataCriacao: new Date().toISOString().split('T')[0]
  };

  depoimentos.push(novoDepoimento);
  return novoDepoimento;
}

function atualizar(id, dadosAtualizados) {
  const indice = depoimentos.findIndex((item) => item.id === id);
  if (indice === -1) return null;

  depoimentos[indice] = {
    ...depoimentos[indice],
    ...dadosAtualizados
  };

  return depoimentos[indice];
}

function atualizarStatus(id, status) {
  const depoimento = buscarPorId(id);
  if (!depoimento) return null;

  depoimento.status = status;
  return depoimento;
}

function remover(id) {
  const indice = depoimentos.findIndex((item) => item.id === id);
  if (indice === -1) return null;

  return depoimentos.splice(indice, 1)[0];
}

module.exports = {
  listarAprovados,
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  atualizarStatus,
  remover
};
