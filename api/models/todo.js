const Sequelize = require("sequelize");
if (process.env.NODE_ENV === "development") {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./todo.db"
  });
} else {
  const sequelize = new Sequelize(
    "postgres://user:pass@example.com:5432/dbname"
  ); // Example for postgres
}

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
