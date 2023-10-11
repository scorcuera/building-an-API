import { Request, Response } from "express";
import UserModel from "../model/user.model";
import USER_SCHEMA from "../schemas/user.schema";

const UserController = {
    async getUsers(request: Request, response: Response) {
        try {
            let users = await UserModel.getUsers();
            response.json(users);
        } catch (error) {
            console.log(error)
        }
    },
    async getUser(request: Request, response: Response) {
        try {
            let userId = request.params.id;
            let user = await UserModel.getUser(userId);
            response.json(user);
        } catch (error) {
            console.log(error)
        }
    },
    async createUser(request: Request, response: Response) {
        try {
            let body = USER_SCHEMA.safeParse(request.body);
            if (body.success === false) {
                return response.status(404).json({error: JSON.parse(body.error.message)});
            }
            let result = await UserModel.createUser(body.data);
            response.json(result);
        } catch (error) {
            console.log(error)
        }
    },
    async updateUser(request: Request, response: Response) {
        try {
            let userId = request.params.id;
            let body = request.body;
            let result = await UserModel.updateUser(userId, body);
            response.json(result);
        } catch (error) {
            console.log(error)
        }
    },
    async deleteUser(request: Request, response: Response) {
        try {
            let userId = request.params.id;
            let result = await UserModel.deleteUser(userId);
            response.json(result);
        } catch (error) {
            console.log(error)
        }
    }
}

export default UserController;