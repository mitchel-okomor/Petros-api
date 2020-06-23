const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  
  try {
    //extract token from request header and decode
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
   //check if ID in request match  token
    if (req.params.id && req.params.id != userId) {
      res.status(401).json({
        status: "error",
        error: 'expired or invalid token'
      });
    } else {
      next();
    }
  } catch(error) {
    res.status(401).json({
      status: "error",
      error: 'please login'
    });
  }
  
};
