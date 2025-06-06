const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

let tarefas = [];

// Carregar o arquivo JSON
fs.readFile('notas.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo de tarefas:', err);
  } else {
    tarefas = JSON.parse(data);
    console.log('Tarefas carregadas com sucesso.');
  }
});

// Rota GET para listar todas as tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});
// Rota GET para listar todas as tarefas
app.get('/tarefas/vendas', (req, res) => {
  res.json(tarefas);
});

// Rota GET para pegar uma tarefa específica pelo índice
app.get('/tarefas/:index', (req, res) => {
  const { index } = req.params;
  const tarefa = tarefas[index];
  if (tarefa) {
    res.json(tarefa);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// Rota POST para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
  const { tipo, titulo, tituloResumido, peso, periodo } = req.body;
  const novaTarefa = { tipo, titulo, tituloResumido, peso, periodo };
  tarefas.push(novaTarefa);
  res.status(201).json(tarefas);
});

// Rota PUT para atualizar uma tarefa existente
app.put('/tarefas/:index', (req, res) => {
  const { index } = req.params;
  const { tipo, titulo, tituloResumido, peso, periodo } = req.body;
  if (tarefas[index]) {
    tarefas[index] = { tipo, titulo, tituloResumido, peso, periodo };
    res.json(tarefas[index]);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// Rota DELETE para remover uma tarefa pelo índice
app.delete('/tarefas/:index', (req, res) => {
  const { index } = req.params;
  if (tarefas[index]) {
    const tarefaRemovida = tarefas.splice(index, 1);
    res.json(tarefaRemovida);
  } else {
    res.status(404).json(tarefas);
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
