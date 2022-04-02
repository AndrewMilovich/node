import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { apiRouter } from './router';
import { config } from './config/config';
import { cronRun } from './cron';

export const RootDir = __dirname;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json(err.message);
});

app.listen(config.PORT, async () => {
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
