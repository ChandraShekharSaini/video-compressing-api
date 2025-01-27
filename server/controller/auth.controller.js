import User from '../module/auth.module.js'
import SignupMailer from "../NodeMailer/SignupMailer.js"
import bcrypt from 'bcryptjs'
import errorHandler from '../utils/error.js'

export const postSignup = async (req, res, next) => {

    try {
        // Check if a user with the given email or number already exists
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { number: req.body.number }
            ]
        });

        if (existingUser) {
            // User already exists
            return next(errorHandler(400, "User already exists"));
        }

        // Hash the password
        const hashPassword = bcrypt.hashSync(req.body.password, 10);

        // Create a new user
        const userData = await User.create({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password // Store the hashed password
        });
        
        SignupMailer(userData.email, userData.firstName)

        // Respond with success
        res.status(200).json({
            message: "User Created Successfully",
            user: userData
        });
    } catch (error) {
        next(error);
    }


}








export const getSignin = async (req, res, next) => {

    const { email, password } = req.body
    console.log(email, password)
    try {
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: "User Not Present" })
        }

        if (user.password != password) {
            return res.status(402).json({ message: "Wrong Credential" })
        }

        res.status(200).json({ message: "Login Successfully" })
    } catch (error) {

    }

}