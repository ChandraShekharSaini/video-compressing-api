import User from '../module/auth.module.js'

export const postSignup = async (req, res, next) => {

    try {
        const userData = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password
        })

        console.log(userData.firstname)
        res.status(200).json({
            message: "User Created Successfully",
            user: userData
        })
    } catch (error) {

        console.error("233 Error", error);
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