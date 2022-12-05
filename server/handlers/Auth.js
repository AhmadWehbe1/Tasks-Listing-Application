const mongodb = require("mongodb");
const { client } = require("../database");
const bcrypt = require("bcrypt");
const { sign } = require("../services/jwt");
const db = client.db("tasksLister");

const Register = (req, res) => {
  const { email, firstName, lastName, password, imgUrl } = req.body;

  // Checking User Already Exists Or not?
  db.collection("users")
    .find({ email })
    .toArray((err, items) => {
      // If exist then return this response
      if (items.length > 0) {
        return res.status(409).send("User Already Exists");
      } else {
        // If not exists then proceed to the next steps
        // Encrypting the Password
        bcrypt
          .hash(password, 10)
          .then((pass) => {
            //   Inserting Data into the database
            db.collection("users").insertOne(
              { email, firstName, lastName, password: pass, imgUrl },
              (err, info) => {
                const id = info.insertedId;

                //   Creating JWT token
                let accessToken = sign({
                  id,
                });

                // Returning response to the user
                return res.status(200).send({
                  accessToken,
                });
              }
            );
          })
          .catch((err) => res.status(404).send("Internal Server Error"));
      }
    });
}

const Login = (req, res) => {
  const { email, password } = req.body;

  //   Checking User Already Exists Or not?
  db.collection("users")
    .find({ email })
    .toArray((err, items) => {
      // If exist then return this response
      if (items.length > 0) {
        // Getting the User
        const user = items[0];

        // Comparing Password
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            // Password Matched
            if (isMatch) {
              // Creating JWT token
              let accessToken = sign({
                id: user._id,
              });
              // Sending Response to the Client On Successfully Login
              res.send({
                accessToken,
              });
            } else {
              // Wrong Password
              return res.status(401).send("Wrong Password");
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        // If user Does Not exits then return this response
        return res.status(401).send("Email is Wrong");
      }
    });
}

const me = (req, res) => {
  const id = req?.user;
  // Checking User Exists or not in the database
  db.collection("users")
    .find({ _id: new mongodb.ObjectId(id) })
    .toArray((err, items) => {
      // User Exists
      if (items.length > 0) {
        // Destructuring
        const user = items[0];
        // Destructuring
        const { email, firstName, lastName, imgUrl } = user;

        // Sending Response to the client
        res.send({ email, firstName, lastName, imgUrl });
      } else {
        // User Does Not Exist
        return res.status(404).send("User Not Found");
      }
    });
}

module.exports = {
  Register,
  Login,
  me,
};
