const { verify } = require("../services/jwt");

const auth = async(req, res, next) => {
  let authHeader = req.headers.authorization;
  // Checking if authorization token exists or not
  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }

  // Destructuring
  const token = authHeader.split(" ")[1];
  try {
    const { id } = verify(token);
    req.user = { id };
    next();
  } catch (err) {
    return res.status(401).send("Un authorized");
  }
}

module.exports = auth;
