const express = require('express');
const router = express.Router();
const depoimentosController = require('../controllers/depoimentos.controller');
const autenticarToken = require('../middleware/auth.middleware');
const {
  validarCamposObrigatorios,
  minimoDeCaracteres,
  validarNota,
  validarStatus
} = require('../middleware/validation.middleware');

router.get('/depoimentos', depoimentosController.listarPublicos);
router.get('/depoimentos/:id', depoimentosController.obterPorId);

router.post(
  '/depoimentos',
  validarCamposObrigatorios('nomeAluno', 'curso', 'mensagem', 'nota'),
  minimoDeCaracteres('nomeAluno', 3),
  minimoDeCaracteres('curso', 3),
  minimoDeCaracteres('mensagem', 10),
  validarNota,
  depoimentosController.criar
);

router.get('/admin/depoimentos', autenticarToken, depoimentosController.listarAdmin);

router.put(
  '/admin/depoimentos/:id',
  autenticarToken,
  validarCamposObrigatorios('nomeAluno', 'curso', 'mensagem', 'nota'),
  minimoDeCaracteres('nomeAluno', 3),
  minimoDeCaracteres('curso', 3),
  minimoDeCaracteres('mensagem', 10),
  validarNota,
  depoimentosController.atualizar
);

router.patch(
  '/admin/depoimentos/:id/status',
  autenticarToken,
  validarCamposObrigatorios('status'),
  validarStatus,
  depoimentosController.atualizarStatus
);

router.delete('/admin/depoimentos/:id', autenticarToken, depoimentosController.remover);

module.exports = router;
