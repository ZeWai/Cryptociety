const express = require("express");
const isLoggedIn = require("../authFuncs/auth.js").isLoggedIn;
const isLoggedInAdmin = require("../authFuncs/auth.js").isLoggedInAdmin;
const fs = require("fs");

class ViewRouter {
  router() {
    let router = express.Router();
    router.get("/", this.getHome.bind(this));
    router.get("/index", this.getIndex.bind(this));
    router.get("/login", this.getLogin.bind(this));
    router.get("/signup", this.getSignup.bind(this));
    router.get("/profile", isLoggedIn, this.getProfile.bind(this));
    router.get("/admin", isLoggedInAdmin, this.getAdmin.bind(this));
    router.get("/404", this.get404.bind(this));
    router.get("/setting", this.getSetting.bind(this));
    router.post("/setting", this.postSetting.bind(this));
    router.put("/setting", this.putSetting.bind(this));
    router.delete("/setting", this.deleteSetting.bind(this));
    router.get("/api/setting", this.getApiSetting.bind(this));
    router.get("/download/album/:name", this.getDownloadAlbum.bind(this));
    router.delete("/delete/album/", this.deleteAlbum.bind(this));
    router.get("/market", this.getMarket.bind(this));
    return router;
  }

  getHome(req, res) {
    res.render("page/login", {
      title: "Login",
      page: "login"
    });
  }
  getIndex(req, res) {
    res.render("page/index", {
      title: "Index",
      page: "index",
      layout: "other",
      username: "Miofong",
      slogan: "Happy Boy",
      icon: () => {
        //check icon Exists
        const iconExists = fs.existsSync("./public/image/uploaded/userIcon.png")
        if (iconExists) {
          let img = "/image/uploaded/userIcon.png"
          return img;
        } else {
          return "";
        }
      }
    });
  }

  getLogin(req, res) {
    res.render("page/index", {
      title: "Index",
      page: "index",
      layout: "other",
      username: "Miofong",
      slogan: "Happy Boy",
      icon: () => {
        //check icon Exists
        const iconExists = fs.existsSync("./public/image/uploaded/userIcon.png")
        if (iconExists) {
          let img = "/image/uploaded/userIcon.png"
          return img;
        } else {
          return "";
        }
      }
    });
  }

  getSignup(req, res) {
    res.render("page/signup", {
      title: "Signup",
      page: "signup"
    });
  }

  getProfile(req, res) {
    res.render("page/index", {
      title: "Index",
      page: "index",
      layout: "other",
      username: "Miofong",
      slogan: "Happy Boy",
      icon: () => {
        const iconExists = fs.existsSync("./public/image/uploaded/userIcon.png")
        if (iconExists) {
          let img = "/image/uploaded/userIcon.png"
          return img;
        } else {
          return "";
        }
      }
    });
  }

  getAdmin(req, res) {
    res.send("ADMIN SECRET DATA");
  }

  get404(req, res) {
    res.status(404).render("page/404", {
      title: "404",
      page: "404",
    });
  }

  getSetting(req, res) {
    res.render("page/setting", {
      title: "Setting",
      page: "setting",
      layout: "other",
      userId: process.env.DB_ID,
      email: process.env.DB_EMAIL,
      username: process.env.DB_USERNAME,
      password: "********",
      gender: process.env.DB_GENDER,
      birthday: process.env.DB_BIRTHDAY,
      country: process.env.DB_COUNTRY,
      joinDate: process.env.DB_JOINDATE,
      slogan: process.env.DB_SLOGAN,
      icon: () => {
        //check icon Exists
        const iconExists = fs.existsSync("./public/image/uploaded/userIcon.png")
        if (iconExists) {
          let img = "/image/uploaded/userIcon.png"
          return img;
        } else {
          return "";
        }
      },
      photo: () => {
        //check photo Exists
        let files = fs.readdirSync("./public/image/photo");
        return files[0];
      }
    });
  }
  postSetting(req, res) {
    //create new icon
    let data = req.files.files
    fs.writeFile("./public/image/uploaded/userIcon.png", data.data, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.render("page/setting", {
      icon: () => {
        const iconExists = fs.existsSync("./public/image/uploaded/userIcon.png")
        if (iconExists) {
          return "../../../../image/uploaded/userIcon.png";
        } else {
          return "";
        }
      }
    });
  }
  putSetting(req, res) {
    let data = req.body.input
    //json to object
    data = JSON.parse(data)
    //verify password
    if (data.password_verify !== process.env.DB_PASSWORD) {
      res.json({
        "verify": "fail",
        "err": "Incorret password! Please try again!"
      })
      data.password_verify = "";
    }
    //check less 6 characters username  
    else if (data.new_username) {
      if (data.new_username.length < 6) {
        res.json({
          "verify": "fail",
          "err": "Username can not less than 6 characters!"
        })
        data.new_username = "";
      } else {
        res.json({
          "verify": "success"
        })
      }
    }
    //check less 8 characters password  
    else if (data.new_password) {
      if (data.new_password.length < 8 || data.confirm_new_password.length < 8) {
        res.json({
          "verify": "fail",
          "err": "Password can not less than 8 characters!"
        })
        data.new_password = "";
        data.confirm_new_password = "";
        //confirm password  
      } else if (data.new_password != data.confirm_new_password) {
        res.json({
          "verify": "fail",
          "err": "Confirm password is incorrect!"
        })
        data.new_password = "";
        data.confirm_new_password = "";
      } else {
        res.json({
          "verify": "success"
        })
      }
    } else {
      res.json({
        "verify": "success"
      })
    }
  }
  deleteSetting(req, res) {
    fs.unlink("./public/image/uploaded/userIcon.png", (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.render("page/setting", {
      icon: () => {
        const iconExists = fs.existsSync("./public/image/uploaded/userIcon.png")
        if (iconExists) {
          return "../../../../image/uploaded/userIcon.png";
        } else {
          return "";
        }
      }
    });
  }
  getApiSetting(req, res) {
    let files = fs.readdirSync("./public/image/photo");
    res.json({
      "photo": files
    })
  }
  getDownloadAlbum(req, res) {
    let caches = {};
    function readFile(file) {
      return new Promise((resolve, reject) => {
        fs.readFile("./public/image/photo/" + file, (err, body) => {
          if (err) {
            return reject(err);
          } else {
            resolve(body);
          }
        });
      });
    }
    if (caches[req.params.name] == null) {
      caches[req.params.name] = readFile(req.params.name);
    }
    caches[req.params.name]
      .then((body) => {
        res.send(body);
      })
      .catch((e) => res.status(500).send(e.message));
  }

  deleteAlbum(req, res) {
    //get data form fontend
    let data = req.body.image
    //remove image
    fs.unlink(`./public/image/photo/${data}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  getMarket(req, res) {
    res.render("page/market", {
      title: "Market",
      page: "market",
      layout: "other"
    });
  }

}

module.exports = ViewRouter;