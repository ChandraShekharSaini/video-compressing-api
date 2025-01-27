import { Strategy as GitHubStrategy } from "passport-github"
import passport from "passport"
import Users from '../module/auth.module.js'
import SignUpMailer from "../NodeMailer/SignupMailer.js"

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECREAT,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },


        async (accessToken, refreshToken, profile, done) => {

            console.log(profile)

            try {

                const newAuthProvider = {
                    providerName: profile.provider,
                    fullName: profile.displayName,
                    profileImage: profile.photos[0].value,
                    providerId: profile.id,
                    accessToken: accessToken,

                }

                const user = await Users.findOne({ email: profile._json.email });

                if (user) {
                    return done(null, user)
                }


                if (user && user.authProviders.length === 0) {
                    console.log(user.authProviders.length)
                    const updatedUser = await Users.findOneAndUpdate(

                        { email: profile._json.email },
                        {
                            $push: { authProviders: newAuthProvider },
                            $set: { currentProvider: 'github' },
                        },

                        { new: true, upsert: false }
                    )


                    return done(null, updatedUser);
                }


                const newUser = await Users.create({
                    email: profile._json.email,
                    currentProvider: profile.provider,
                    authProviders: [newAuthProvider]

                })

                console.log(newUser);
                SignUpMailer(newUser.email, profile.displayName);
                return done(null, newUser);


            } catch (error) {
                return done(error)
            }
        }

    )
)

export default passport


