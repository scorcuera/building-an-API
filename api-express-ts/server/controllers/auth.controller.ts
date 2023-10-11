import { Request, Response } from "express";
import UserModel from "../model/user.model";
import { encryptPassword, verifyPassword} from "../utils/password.handler";
import { RowDataPacket } from "mysql2";

const AuthController = {
    async registerUser(request: Request, response: Response) {
        try {
            // get body data
            const userFromBody = request.body;
            const userEmail = userFromBody.email;

            // user already exists or not ?
            const user = await UserModel.getUserByEmail(userEmail) as RowDataPacket;
            if (user.length) {
                response.status(409).json("This user already exists.")
            }

            // encrypt password
            const userPassword = userFromBody.password;
            const encryptedPassword = await encryptPassword(userPassword);

            //push to the db
            await UserModel.createUser({...userFromBody, password: encryptedPassword});
            response.json("User registered succesfully");
        } catch (error) {
            throw error;
        }
    },
    async logInUser(request: Request, response: Response) {
        // get body data
        const userFromBody = request.body;
        const userEmail = userFromBody.email;

        // user already exists or not ?
        const isRegistered = await UserModel.getUserByEmail(userEmail) as RowDataPacket;
        if (!isRegistered.length) {
            response.status(404).json("This user does not exist.")
        }

        // verify that encrypted password is associated with literal password

        const isValidPassword = await verifyPassword(userFromBody.password, isRegistered[0].password);
        console.log(isValidPassword)
        if (!isValidPassword) {
            response.status(401).json("Not valid password")
        }

        // generate token
        
        // success

        response.json("Logged In succesfully !")

    }
}

export default AuthController;