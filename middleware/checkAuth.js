// check auth function to prevent unauthenticated users from accessing certain routes

const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.cookies.userToken;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ error: "Unauthorized" });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};


module.exports = checkAuth;