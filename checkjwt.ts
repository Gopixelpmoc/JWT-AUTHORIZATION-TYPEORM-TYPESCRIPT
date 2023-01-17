import Jwt = require("jsonwebtoken");

export default  {
  authorizeUser: () => {
    return (req, res, next) => {
      console.log("enter")
      const token =
        req.headers["x-access-token"] || req.headers["authorization"];
      if (token) {
        if(token.split(' ')[1]){
          const decoded = Jwt.verify(token.split(' ')[1], "SECRET");;
          if (decoded) {
            req.user = decoded;
            next();
          } else {
  
            res.status(401).json({
              error: "Invalid token",
            });
            //logger.error("Invalid token");
          }
        }else{
          res.status(401).json({
            error: "Not authorized",
          });              
        }
       
      } else {
        res.status(401).json({
          error: "Not authorized",
        });
        //logger.error("Not authorized");
      }
    };
  },
};