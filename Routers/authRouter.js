const express = require("express");
const passportFunctions = require("../passport");

class AuthRouter {
  router() {
    let router = express.Router();

    router.post(
      "/signup",
      passportFunctions.authenticate("local-signup", {
        successRedirect: "/signup"

      })
    );

    router.post(
      "/login",
      passportFunctions.authenticate("local-login", {
        successRedirect: "/page/profile",
        failureRedirect: "/",
      })
    );

    router.get(
      "/auth/gmail",
      passportFunctions.authenticate("google", {
        scope: ["profile", "email"],
      })
    );

    router.get(
      "/auth/gmail/callback",
      passportFunctions.authenticate("google", {
        successRedirect: "/index",
        failureRedirect: "/404",
      })
    );

    router.get(
      "/auth/facebook",
      passportFunctions.authenticate("facebook", {
        scope: ["email", "public_profile"],
      })
    );

    router.get(
      "/auth/facebook/callback",
      passportFunctions.authenticate("facebook"
        , {
          successRedirect: "/index",
          failureRedirect: "/404",
        })
    );

    router.get("/logout", (req, res) => {
      req.logout();
      res.render("login");
    });

    return router;
  }
}

module.exports = AuthRouter;