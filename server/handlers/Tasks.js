const mongodb = require("mongodb");
const { client } = require("../database");
const db = client.db("tasksLister");

const addTask = (req, res) => {
  const { task, isCompleted, createdAt } = req.body;
  const { id } = req?.user;

  console.log(req.body);

  //   Checking Required fields is received or not
  if (!task || isCompleted === undefined || !createdAt) {
    return res.status(400).send("All Fields are Required");
  }

  db.collection("tasks").insertOne(
    { task, isCompleted, userId: id, createdAt },
    (err, info) => {
      const id = info.insertedId;

      if (id) {
        // Returning response to the user
        return res
          .status(200)
          .send({ message: "New Task Added Successful", id });
      }
    }
  );
}

const getTasks = (req, res) => {
  const userId = req?.user?.id;

  // Getting Data from database
  db.collection("tasks")
    .find({ userId })
    .toArray((err, items) => {
      // Returning response to the client side
      return res.send(items);
    });
}

const deleteTask = (req, res) => {
  const { id } = req.body;

  // deleting a data by it's ID
  db.collection("tasks").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    () => {
      // Sending Response to the client side
      res.send("Successfully deleted!");
    }
  );
}

const updateTask = (req, res) => {
  const { id, isCompleted, task, createdAt } = req.body;

  // updating a data by it's ID and new value
  db.collection("tasks").findOneAndUpdate(
    { _id: new mongodb.ObjectId(id) },
    { $set: { task: task, isCompleted: isCompleted, createdAt } },
    () => {
      res.send("Success updated!");
    }
  );
}

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
};
