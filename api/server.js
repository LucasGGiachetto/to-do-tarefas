const express = require('express');
const cors = require('cors');

const app = express();
const usuarioRoutes = require('./routes/usuarios.js');
const tarefasRoutes = require('./routes/tarefas.js');

app.use(cors());
app.use(express.json());

app.use('/usuario', usuarioRoutes);
app.use('/tarefas', tarefasRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
