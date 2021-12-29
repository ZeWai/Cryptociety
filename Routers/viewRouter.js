const express = require("express");
const isLoggedIn = require("../authFuncs/auth.js").isLoggedIn;
const isLoggedInAdmin = require("../authFuncs/auth.js").isLoggedInAdmin;

class ViewRouter {
  router() {
    let router = express.Router();
    router.get("/", this.getHome.bind(this));
    router.get("/login", this.getLogin.bind(this));
    router.get("/signup", this.getSignup.bind(this));
    router.get("/profile", isLoggedIn, this.getProfile.bind(this));
    router.get("/admin", isLoggedInAdmin, this.getAdmin.bind(this));
    router.get("/404", this.get404.bind(this));
    return router;
  }

  getHome(req, res) {
    res.render("home");
  }

  getLogin(req, res) {
    res.render("login");
  }
  getSignup(req, res) {
    res.render("signup");
  }
  getProfile(req, res) {
    res.render("profile");
  }
  getAdmin(req, res) {
    res.send("ADMIN SECRET DATA");
  }
  get404(req, res) {
    res.render("404");
  }
}

module.exports = ViewRouter;