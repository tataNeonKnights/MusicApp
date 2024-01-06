//middleware required for all the protected routes

const jwt = require("jsonwebtoken");
const JWT_SECRET = "strongKeyPassword_jwt";

const fetchuser = (req, res, next) => {
  //get the user from jwt token and add id to req object

  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Access Denied (invalid token)" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    // console.log("raza",data.user)
    req.user = data.user;
  } catch (err) {
    return res.status(401).send({ error: "Access Denied (invalid token)" });
  }
  next();
};

module.exports = fetchuser;
