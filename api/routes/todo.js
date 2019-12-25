const { Router } = require("express");
const router = Router();
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./todo.db", err => {
  if (err) {
    console.error(err.message)
  }
  console.log("Connected to the todo database.")
});

router.get("/todo", (req, res) => {
  let sql = `SELECT * FROM todo`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err)
      res.json(err);
    }
    res.json(rows);
  });
});

router.get("/todo/:id", (req, res) => {
  let sql = `SELECT * FROM todo WHERE todo_id = ?`;

  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.error(err)
      res.json(err);
    }
    if (row) { 
      res.json(row);
    } else {
      res.sendStatus(404);
    }
  });
});

router.post("/todo", (req, res) => {
  let data = [req.body.content]
  let sql = `INSERT INTO todo(content, createdAt, updatedAt) 
              VALUES 
              (?, datetime('now', 'localtime'), datetime('now', 'localtime'))`
  db.run(sql, data, function(err) {
    if (err) {
      console.error(err)
      res.json(err);
    }
  });

  db.get("select * from todo where todo_id = last_insert_rowid();", [], (err, row) => {
    if (err) {
      console.error(err)
      res.json(err);
    }
    if (row) { 
      res.status(201).json(row);
    } else {
      res.sendStatus(404);
    }
  });
});

router.patch("/todo/:id", (req, res) => {
  const data = [
    req.body.content,
    req.params.id
  ];
  const sql = `UPDATE todo 
                SET content = ?,
                updatedAt = datetime('now', 'localtime') 
                WHERE todo_id = ?`;

  db.run(sql, data, (err, row) => {
    if (err) {
      console.error(err)
      res.json(err);
    }
    res.json(row);
  });
});

router.delete("/todo/:id", (req, res) => {
  let sql = `DELETE FROM todo WHERE todo_id = ?`;

  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      console.error(err)
      res.json(err);
    }
    res.send('');
  });
});

module.exports = router;
