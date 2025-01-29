import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {User} from "../models/userModel.js"

export default function configurePassport(passport) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: 'http://localhost:8000/api/v1/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
              user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
              });
            }
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
    });
  }