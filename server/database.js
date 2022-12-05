const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

const init = () => {
  client
    .connect()
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Error in connecting database");
    });
};


module.exports = {
  init,
  client,
};