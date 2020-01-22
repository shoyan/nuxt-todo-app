const Sequelize = require("sequelize");
console.log(process.env)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./todo.db"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize.define(
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
