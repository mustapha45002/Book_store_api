const { func } = require("joi");
const jwt = require("jsonwebtoken");

// verify token
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.secretKey);
      req.userData = decoded;

      next();
    } catch {
      res.status(401).send("invalid token");
    }
  } else {
    res.status(404).send("no token provided");
  }
}
// verify Token and Authorization
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.userData.id === req.params.id || req.userData.isAdmin) {
      
        next();
    } else {
      return res.status(208).send("You are not id");
    }
  });
}
// verify Token and Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.userData.isAdmin) {
        next();
    } else {
      return res.status(208).send("You are not Admin");
    }
  });
}
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
