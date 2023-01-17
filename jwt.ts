
// import { Request, Response, NextFunction } from 'express';
// import Jwt = require("jsonwebtoken");
// import { User } from '../entity/User';




// export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.get('Authorization');
//     if (!authHeader) {
//       const user = new User(400, User, 'Authorization header not provided');
//       return next(User);
//     }
  
//     const token = authHeader.split(' ')[1];
//     let jwtPayload: { [key: string]: any };
//     try {
//         const verifyToken = Jwt.verify(token, process.env.JWT_SECRET);
//       //jwtPayload = Jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };
//     //   ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
//     //   req.JwtPayload = jwtPayload as JwtPayload;
//     } catch (err) {
//       const user = new User(401, 'Raw', 'JWT error', null, err);
//       return next(User);
//     }
// }
  