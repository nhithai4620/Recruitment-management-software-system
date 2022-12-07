const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const TokenHeader = req.headers["authorization"].split(" ");
  const bearerHeader = TokenHeader[1];

  if (bearerHeader) {
    jwt.verify(bearerHeader, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).json({ message: "Token is not valid!" });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(403).json({
      error: "UnauthorizedException",
      statusCode: 403,
      message: "Unauthorized",
    });
  }
};

module.exports = {
  verifyToken,
};
