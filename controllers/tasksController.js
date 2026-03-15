const db = require("../database");

exports.createTask = (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const query = `
    INSERT INTO tasks (title, description, status)
    VALUES (?, ?, ?)
  `;

  db.run(query, [title, description, status], function (err) {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      id: this.lastID,
      title,
      description,
      status
    });
  });
};

exports.getTasks = (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.getTaskById = (req, res) => {
  db.get("SELECT * FROM tasks WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

exports.updateTask = (req, res) => {
  const { title, description, status } = req.body;

  db.run(
    `UPDATE tasks SET title=?, description=?, status=? WHERE id=?`,
    [title, description, status, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteTask = (req, res) => {
  db.run("DELETE FROM tasks WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
};