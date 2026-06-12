const passport =
require("passport");

const GoogleStrategy =
require("passport-google-oauth20")
.Strategy;

const User =
require("../models/User");

passport.use(

  new GoogleStrategy(

    {
      clientID:
        process.env
        .GOOGLE_CLIENT_ID,

      clientSecret:
        process.env
        .GOOGLE_CLIENT_SECRET,

      callbackURL:
        "/api/auth/google/callback"
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {
            let user =
            await User.findOne({
            email:
            profile.emails[0].value
            });

            if (user) {

            if (
                !user.providerId
            ) {

                user.provider =
                "google";

                user.providerId =
                profile.id;

                user.avatar =
                profile.photos[0]?.value;

                await user.save();

            }

            return done(
                null,
                user
            );

            }

        user =
                await User.create({

                name:
                    profile.displayName,

                email:
                    profile.emails[0].value,

                provider:
                    "google",

                providerId:
                    profile.id,

                avatar:
                    profile.photos[0]?.value,

                isVerified: true

                });
      } catch (error) {

        done(error);

      }

    }

  )

);

passport.serializeUser(
  (user, done) => {
    done(
      null,
      user.id
    );
  }
);

passport.deserializeUser(
  async (id, done) => {

    const user =
      await User.findById(id);

    done(
      null,
      user
    );

  }
);

module.exports =
passport;