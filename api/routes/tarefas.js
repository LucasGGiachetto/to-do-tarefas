const express = require('express');
const router = express.Router();
const db = require('../db');

// GET
router.get('/', (req, res) => {
  db.all('SELECT * FROM tarefas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { titulo, descricao, status } = req.body;
  db.run(
    'INSERT INTO tarefas (titulo, descricao, status) VALUES (?, ?, ?)',
    [titulo, descricao, status || 'A Fazer'],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.put('/:id', (req, res) => {
  const { titulo, descricao, status } = req.body;
  db.run(
    'UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
    [titulo, descricao, status, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tarefas WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
