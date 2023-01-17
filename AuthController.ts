import { validate } from "class-validator";
import { Request, Response, response } from "express";
import { request } from "http";
import { BaseEntity } from "typeorm";
import { getRepository } from "typeorm"
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";





class AuthController {
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json("please provide password and login");

            
            
            
        }

        const userRepository = getRepository(User);
        console.log("userRepository", userRepository);

        
        
        
        let user: User;
        try {
            user = await userRepository.findOne({ where: { email: email } });
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    return res.status(200).json({ userDetails:user,access_token: user.generateJWT() });
                } else {
                    res.status(401).send("Incorrect Password");
                    return;
                }
            } else {
                res.status(401).send("User Not Found");
                return;
            }

            // if (user && !user.isValidPassword(password)){

            // }

        } catch (error) {
            res.status(401).send(error);
        }



    }
    static register = async (req, res) => {
        const { email, password } = req.body;

      
        
        let user = new User();

        user.email = email;

        user.password = await bcrypt.hashSync(password, 8)

        // console.log(user, "checking")

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const useRepository = getRepository(User);
        console.log("enter", useRepository)
        try {
           
            const _user = await useRepository.findOne({ where: { email: email } });
            //console.log(user, "user")
            if (_user) {
                //console.log("enter1")
                res.status(409).send("User Already exits");
                return;
            } else {
                //console.log("enter2")
                console.log(useRepository)
                const data = await useRepository.save(user)
                
                console.log(data, "data")
               return res.status(201).send({userDetails:data,"message":"User Created", "status":"success"});
            }

        } catch (e) {

        }
        //res.status(200).send("helo")


    }


}

export default AuthController;