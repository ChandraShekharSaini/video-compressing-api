import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import SignUpMailer from '../NodeMailer/SignupMailer.js';

import Users from '../module/auth.module.js';

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECREAT,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      // console.log(profile._json.picture)
      // console.log(profile._json.email)
      // console.log(profile._json.name)
      // console.log(profile.id) 

      try {

        const newAuthProvider = {
          providerName: profile.provider,
          fullName: profile.displayName,
          profileImage: profile._json.picture,
          providerId: profile.id,
          accessToken: accessToken,

        }

        const user = await Users.findOne({ email: profile._json.email });

        if (user) {
          const user = await Users.findOne({
            email: profile._json.email,
            'authProviders.providerName': 'google',
          });

          return done(null, user)
        }


        if (user && user.authProviders.length === 0) {
          console.log(user.authProviders.length)
          const updatedUser = await Users.findOneAndUpdate(

            { email: profile._json.email },
            {
              $push: { authProviders: newAuthProvider },
              $set: { currentProvider: 'google' },
            },

            { new: true, upsert: false }
          )


          return done(null, updatedUser);
        }


        const newUser = await Users.create({
          email: profile.emails[0].value,
          currentProvider: profile.provider,
          authProviders: [newAuthProvider]

        })

        console.log(newUser);
        SignUpMailer(newUser.email, newUser.firstName);
        return done(null, newUser);


      }
      catch (err) {
        return done(err, null);
      }
    }
  )
);

// Local Strategy
passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return done(err);
        if (!result) return done(null, false);
        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  })
);

//Passport Setup
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});











export default passport;
