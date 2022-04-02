"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    async createdUser(req, res) {
        const createdUser = await services_1.userService.createUser(req.body);
        return res.json(createdUser);
    }
    async getUserById(req, res) {
        const id = Number(req.params.id);
        const user = await services_1.userService.getUserById(id);
        return res.json(user);
    }
    async getUser(req, res) {
        const getUser = await services_1.userService.getUser();
        return res.json(getUser);
    }
    // public async getUserByEmail(req:{body:{email:string}},
    // res:Response):Promise<Response<IUser>> {
    //     const { email } = req.body;
    //     const userEmail = await userService.getUserByEmail(email);
    //     return res.json(userEmail);
    // }
    async updateUser(req, res) {
        const id = Number(req.params.id);
        const getUser = await services_1.userService.updateUser(req.body, id);
        return res.json(getUser);
    }
    async deleteUser(req, res) {
        const id = Number(req.params.id);
        const getUser = await services_1.userService.deleteUser(id);
        return res.json(getUser);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map