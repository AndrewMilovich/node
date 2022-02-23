import express, { Request, Response } from 'express';
import { users } from './users';

const app = express();
app.get('/', (req: Request, res: Response) => {
    res.end();
});
console.log(users);
app.listen(5500, () => {
    console.log('Server start 5500');
});
