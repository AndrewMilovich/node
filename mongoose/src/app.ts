import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import fileUpload from 'express-fileupload';
import SocketIO from 'socket.io';
import * as http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { apiRouter } from './router';
import { config } from './config/config';
// import { cronRun } from './cron';

export const RootDir = __dirname;

const app = express();
const server = http.createServer(app);

mongoose.connect('mongodb://localhost:27017/students');

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: 'GET, PUT, POST',
    credentials: true,
}));

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

server.listen(config.PORT, async () => {
    console.log(`Serves has started on PORT: ${config.PORT}`);

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
            // await cronRun();
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
