const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // for session
  // if (req.session && req.session.user) {
  //   next();
  // } else {
  //   res.status(401).send({
  //     success: false,
  //     message: "Unauthorized can access to this page",
  //   });
  // }

  // for jwt

  const token = req.headers.authorization;
  const secret = process.env.SECRET;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "Unauthorized acess Invalid token Recieved",
          data: err,
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send({
      success: false,
      message: "Token not recieved",
    });
  }
};
