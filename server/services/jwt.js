const jwt = require("jsonwebtoken");
const sign = (payload, expiry = "1y", secret = process.env.JWT_ACCESS_SECRET) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiry,
  });
}

const verify = (payload, secret = process.env.JWT_ACCESS_SECRET) => {
  return jwt.verify(payload, secret);
}

module.exports = {
  sign,
  verify,
};
