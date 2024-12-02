import dotenv from 'dotenv'
import express from 'express'
import config from 'config'
import { connectDB } from './database/connect-database';
import { log } from './utils/logger';
dotenv.config();

const app = express();

const port = config.get('port')


app.listen(port, () => {
    log.info(`App started at http://localhost:${port}`)
    connectDB();
})
