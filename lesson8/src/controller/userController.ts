import { Request, Response } from 'express';
import { IUser } from '../interface/user.interface';
import { userService } from '../services';

class UserController {
    public async createdUser(req:Request, res:Response):Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserById(
        req: { params: { id: string; }; },
        res: Response,
    ):Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const user = await userService.getUserById(id);
        return res.json(user);
    }

    public async getUser(req:Request, res:Response):Promise<Response<IUser>> {
        const getUser = await userService.getUser();
        return res.json(getUser);
    }

    public async getUserByEmail(req:{body:{email:string}}, res:Response):Promise<Response<IUser>> {
        const { email } = req.body;
        const userEmail = await userService.getUserByEmail(email);
        return res.json(userEmail);
    }

    public async updateUser(
        req: { params: { id: string; }; body: IUser; },
        res: { json: (arg0: IUser) => Response<IUser,
                Record<string, any>> | PromiseLike<Response<IUser,
                Record<string, any>>>; },
    ):
        Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const getUser = await userService.updateUser(req.body, id);
        return res.json(getUser);
    }

    public async deleteUser(
        req: { params: { id: string; } },
        res: { json: (arg0: IUser) => Response<IUser,
                Record<string, any>> | PromiseLike<Response<IUser,
                Record<string, any>>>; },
    ):
        Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const getUser = await userService.deleteUser(id);
        return res.json(getUser);
    }
}
export const userController = new UserController();
