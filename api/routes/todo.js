const { Router } = require("express");
const router = Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./todo.db"
});

const Todo = sequelize.define(
  "todo",
  {
    todo_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

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
