require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./middlewares/auth");
const { init } = require("./database");

init();

const { Register, Login, me, Uploads } = require("./handlers/Auth");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("./handlers/Tasks");

const PORT = process.env.PORT || 8000;

express()
  .use(cors())
  .use(express.json())
  // .use(helmet())
  // .use(morgan("tiny"))
  .post("/register", Register)
  .post("/login", Login)
  .get("/me", auth, me)

  .post("/add-task", auth, addTask)
  .get("/get-tasks", auth, getTasks)
  .delete("/delete-task", auth, deleteTask)
  .put("/update-task", auth, updateTask)

  .listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
  });
