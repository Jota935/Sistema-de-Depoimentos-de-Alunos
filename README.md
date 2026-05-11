# Sistema de Depoimentos de Alunos

Trabalho prático de **Desenvolvimento de Aplicações Web**.

## Objetivo
Desenvolver uma API REST com ExpressJS para gerir depoimentos de alunos, aplicando:
- estrutura organizada do projeto;
- rotas e controllers bem definidos;
- middlewares de validação;
- middleware de autenticação com token;
- tratamento centralizado de erros.

## Tema
**T6 - Sistema de Depoimentos de Alunos**

## Estrutura do projeto
```bash
src/
 ├── controllers/
 ├── data/
 ├── middleware/
 ├── models/
 └── routes/
server.js
README.md
```

## Requisitos do sistema
1. Cadastrar depoimentos de alunos.
2. Listar depoimentos aprovados publicamente.
3. Consultar depoimento por ID.
4. Listar todos os depoimentos na área administrativa.
5. Editar depoimento.
6. Alterar status do depoimento.
7. Remover depoimento.
8. Validar os dados recebidos.
9. Proteger rotas administrativas com token.
10. Tratar erros de forma padronizada.

## Campos do depoimento
- `id`
- `nomeAluno`
- `curso`
- `mensagem`
- `nota`
- `status`
- `dataCriacao`

## Regras de negócio
- `nomeAluno`, `curso`, `mensagem` e `nota` são obrigatórios.
- `mensagem` deve ter pelo menos 10 caracteres.
- `nota` deve estar entre 1 e 5.
- `status` deve ser `pendente`, `aprovado` ou `rejeitado`.
- Rotas de administração exigem token.

## Instalação e execução
```bash
npm install
cp .env.example .env
npm start
```

## Endereço base da API
```bash
http://localhost:3000/api
```

## Token de autenticação
No arquivo `.env`:
```env
API_TOKEN=token123
```

Enviar no header:
```bash
Authorization: Bearer token123
```

## Endpoints
### Públicos
- `GET /api/depoimentos`
- `GET /api/depoimentos/:id`
- `POST /api/depoimentos`

### Administrativos
- `GET /api/admin/depoimentos`
- `PUT /api/admin/depoimentos/:id`
- `PATCH /api/admin/depoimentos/:id/status`
- `DELETE /api/admin/depoimentos/:id`

## Exemplos de requisições
### 1) GET público
```bash
curl http://localhost:3000/api/depoimentos
```

### 2) POST público para criar depoimento
```bash
curl -X POST http://localhost:3000/api/depoimentos \
  -H "Content-Type: application/json" \
  -d '{
    "nomeAluno": "Jarni Monteiro",
    "curso": "Informática",
    "mensagem": "O sistema ficou simples, claro e muito bom para aprender Express.",
    "nota": 5
  }'
```

### 3) GET administrativo com token válido
```bash
curl http://localhost:3000/api/admin/depoimentos \
  -H "Authorization: Bearer token123"
```

### 4) PATCH com token válido
```bash
curl -X PATCH http://localhost:3000/api/admin/depoimentos/2/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token123" \
  -d '{
    "status": "aprovado"
  }'
```

### 5) GET sem token (erro)
```bash
curl http://localhost:3000/api/admin/depoimentos
```

Resposta esperada:
```json
{
  "mensagem": "Token não fornecido."
}
```

### 6) GET com token inválido (erro)
```bash
curl http://localhost:3000/api/admin/depoimentos \
  -H "Authorization: Bearer tokenErrado"
```

Resposta esperada:
```json
{
  "mensagem": "Token inválido."
}
```

## Observação
Este projeto usa armazenamento em memória para manter o trabalho simples e fácil de apresentar.
