import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import fileUpload from 'express-fileupload';
import SocketIO from 'socket.io';
import * as http from 'http';
import { apiRouter } from './router';
import { config } from './config/config';
import { cronRun } from './cron';

export const RootDir = __dirname;

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket:any) => {
    console.log(socket.handshake.query.userId);
    console.log(socket.handshake.query.accessToken);

    socket.on('message:send', (data:any) => {
        console.log(data);
        socket.emit('message:getAll', { messages: [{ text: data.message }] });
    });

    socket.on('join_room', (data:any) => {
        socket.join(data.id);
        io.to(data.id).emit('user-room', { message: `hello user ${data.id}` });

        socket.on('message-list', (value:any) => {
            io.to(data.id).emit('message-user', value);
        });
    });
});

app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

app.use(apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json(err.message);
});

server.listen(config.PORT, async () => {
    console.log(`Serves has started on PORT: ${config.PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            await cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
