import path from 'path';
import express from 'express'
const router = express.Router();
import passport from 'passport';

import { postSignup, getSignin } from '../controller/auth.controller.js'


router.post('/signup', postSignup)
router.post('/signin', getSignin)

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/profile');
    });





export default router