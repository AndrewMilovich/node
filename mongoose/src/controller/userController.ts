import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interface/user.interface';
import { userService } from '../services';

class UserController {
    public async createdUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserById(
        req: { params: { id: string; }; },
        res: Response,
    ): Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const user = await userService.getUserById(id);
        return res.json(user);
    }

    public async getUser(req: Request, res: Response): Promise<Response<IUser>> {
        const getUser = await userService.getUser();
        return res.json(getUser);
    }

    public async updateUser(
        req: { params: { id: string; }; body: IUser; },
        res: {
            json: (arg0: IUser) => Response<IUser,
                Record<string, any>> | PromiseLike<Response<IUser,
                Record<string, any>>>;
        },
    ):
        Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const getUser = await userService.updateUser(req.body, id);
        return res.json(getUser);
    }

    public async deleteUser(
        req: { params: { id: string; } },
        res: {
            json: (arg0: IUser) => Response<IUser,
                Record<string, any>> | PromiseLike<Response<IUser,
                Record<string, any>>>;
        },
    ):
        Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const getUser = await userService.deleteUser(id);
        return res.json(getUser);
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            // https://auto.ria.com/uk/search/?
            // categories.main.id=1&
            // price.currency=1&
            // price.USD.gte=2000&
            // price.USD.lte=9000&
            // indexName=auto,order_auto,newauto_search&
            // brand.id[0]=29&
            // model.id[0]=1268&
            // year[0].gte=2007&
            // year[0].lte=2019&
            // size=20
            const { page = 1, perPage = 25, ...other } = req.query;

            const userPagination = await userService.getUserPagination(other, +page, +perPage);

            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
