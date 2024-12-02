import dotenv from 'dotenv'
import express from 'express'
import config from 'config'
import { connectDB } from './database/connect-database';
import { log } from './utils/logger';
import { router } from './routes/index.route';
dotenv.config();

const app = express();
app.use(router)
const port = config.get('port')


app.listen(port, () => {
    log.info(`App started at http://localhost:${port}`)
    connectDB();
})
