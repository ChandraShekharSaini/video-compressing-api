import path from 'path';
import express from 'express'
const router = express.Router();

import { postSignup,getSignin } from '../controller/auth.controller.js'


router.post('/signup', postSignup)
router.post('/signin', getSignin )




export default router