import express from 'express'
import userRoute from './user.route'
import authRoute from './auth.route'


export const router = express.Router();

router.use(userRoute)
router.use(authRoute)


router.get('/healthCheck', (_,res) => {
    res.sendStatus(200)
})