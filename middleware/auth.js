const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;
   
    if (req.params.id && req.params.id != userId) {
      res.status(401).json({
        status: "error",
        error: 'expired or invalid token'
      });
    } else {
      console.log("Just leaving auth middleware");
      next();
    }
  } catch(error) {
    console.log(error)
    res.status(401).json({
      status: "error",
      error: 'please login'
    });
  }
  
};
