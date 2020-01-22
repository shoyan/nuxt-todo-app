const { Router } = require("express");
const router = Router();
const Todo = require('../models/todo')

router.get("/todo", (req, res) => {
  Todo.findAll().then(todo => {
    res.json(todo);
  }).catch((err) => {
    console.error(err);
    res.json(err);
  });
});

router.get("/todo/:id", async (req, res) => {
  const row = await Todo.findOne({
    where: {
      todo_id: req.params.id
    }
  })  

  if (row) { 
    res.json(row);
  } else {
    res.sendStatus(404);
  } 
});

router.post("/todo", (req, res) => {
  Todo.create({ content: req.body.content }).then(todo => {
    res.status(201).json(todo);
  }).catch((err) => {
    console.error(err)
    res.json(err);
  });
});

router.patch("/todo/:id", async (req, res) => {
  const row = await Todo.findOne({
    where: {
      todo_id: req.params.id
    }
  })  

  if (!row) { 
    res.sendStatus(404);
  }

  row.content = req.body.content
  row.save().then(() => {
    res.json(row);
  }).catch((err) => {
    console.error(err)
    res.json(err);
  });
});

router.delete("/todo/:id", (req, res) => {
  Todo.destroy({
    where: {
      todo_id: req.params.id
    }
  }).then(() => {
    res.send('');
  }).catch((err) => {
      console.error(err)
      res.json(err);
  });
});

module.exports = router;
