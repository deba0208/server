const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { componentModel } = require("../Models/data");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback", // Ensure HTTP is used here
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await componentModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new componentModel({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await componentModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
