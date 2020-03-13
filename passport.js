import passport from "passport";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { facebookLoginCallback } from "./controllers/userController";
import routers from "./routers";

passport.use(User.createStrategy());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:3000${routers.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
