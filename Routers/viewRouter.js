const express = require("express");
const isLoggedIn = require("../authFuncs/auth.js").isLoggedIn;
const isLoggedInAdmin = require("../authFuncs/auth.js").isLoggedInAdmin;
const fs = require("fs");

class ViewRouter {
  constructor(knex) {
    this.knex = knex;
  }
  router() {
    let router = express.Router();
    router.get("/login", this.getLogin.bind(this));
    router.get("/signup", this.getSignup.bind(this));
    router.get("/", isLoggedIn, this.getIndex.bind(this));
    router.get("/index", isLoggedIn, this.getIndex.bind(this));
    router.get("/profile", isLoggedIn, this.getProfile.bind(this));
    router.get("/admin", isLoggedInAdmin, this.getAdmin.bind(this));
    router.get("/setting", isLoggedIn, this.getSetting.bind(this));
    router.post("/setting", isLoggedIn, this.postSetting.bind(this));
    router.put("/setting", isLoggedIn, this.putSetting.bind(this));
    router.delete("/setting", isLoggedIn, this.deleteSetting.bind(this));
    router.get("/api/setting", isLoggedIn, this.getApiSetting.bind(this));
    router.get("/download/album/:name", isLoggedIn, this.getDownloadAlbum.bind(this));
    router.delete("/delete/album/", isLoggedIn, this.deleteAlbum.bind(this));
    router.get("/market", isLoggedIn, this.getMarket.bind(this));
    router.get("/404", this.get404.bind(this));
    router.get("/logout", isLoggedIn, this.getLogout.bind(this))
    return router;
  }
  getLogout(req, res) {
    req.logout();
    res.redirect('/');
  };

  getLogin(req, res) {
    res.render("page/login", {
      title: "Login",
      page: "login"
    });
  }
  getIndex(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        res.render("page/index", {
          title: "Index",
          page: "index",
          layout: "other",
          username: db.username,
          solgan: db.solgan,
          icon: () => {
            if (db.profile_picture) {
              return db.profile_picture;
            } else {
              return "";
            }
          }
        });
      })
  }

  getHome(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        res.render("page/index", {
          title: "Index",
          page: "index",
          layout: "other",
          username: db.username,
          solgan: db.solgan,
          icon: () => {
            if (db.profile_picture) {
              return db.profile_picture;
            } else {
              return "";
            }
          }
        });
      })
  }

  getSignup(req, res) {
    res.render("page/signup", {
      title: "Signup",
      page: "signup"
    });
  }

  getProfile(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        res.render("page/index", {
          title: "Index",
          page: "index",
          layout: "other",
          username: db.username,
          solgan: db.solgan,
          icon: () => {
            if (db.profile_picture) {
              return db.profile_picture;
            } else {
              return "";
            }
          }
        });
      })
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
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        res.render("page/setting", {
          title: "Setting",
          page: "setting",
          layout: "other",
          userId: db.id,
          email: db.email_address,
          username: db.username,
          password: "********",
          gender: db.gender,
          birthday: `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
          country: db.country,
          joinDate: `${db.created_at.getFullYear()}-${db.created_at.getMonth() + 1}-${db.created_at.getDate()}`,
          solgan: db.solgan,
          icon: () => {
            if (db.profile_picture) {
              return db.profile_picture;
            } else {
              return "";
            }
          }
        });
      })
  }
  postSetting(req, res) {
    console.log(req.files.files)
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        //create new icon
        let data = req.files.files
        //updata server
        this.knex("user_profile")
          .where("id", req.user.id)
          .update({
            profile_picture: data
          })
          .then(() => {
            res.render("page/setting", {
              icon: db.profile_picture
            });
          })
        //fs.writeFile("./public/image/uploaded/userIcon.png", data.data, (err) => {
        //  if (err) {
        //    console.log(err);
        //  }
        //});

      })
  }
  putSetting(req, res) {
    //get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        let data = req.body.input
        //json to object
        data = JSON.parse(data)
        //verify password
        if (data.password_verify !== db.password) {
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
            if (data.new_username.length > 0) {
              //updata server
              this.knex("user_profile")
                .where("id", req.user.id)
                .update({
                  username: data.new_username
                })
                .then(() => {
                  res.json({
                    "verify": "success",
                    "username": `${data.new_username}`
                  })
                })
            }
          }
        }
        //check less 8 characters password  
        else if (data.new_password) {
          if (data.new_password.length < 8 || data.confirm_new_password.length < 8 || data.new_password.length == 0 || data.confirm_new_password.length == 0) {
            res.json({
              "verify": "fail",
              "err": "Password can not less than 8 characters!",
              "username": `${db.username}`,
              "gender": `${db.gender}`,
              "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
              "country": `${db.country}`
            })
            data.new_password = "";
            data.confirm_new_password = "";
            //confirm password  
          } else if (data.new_password != data.confirm_new_password) {
            res.json({
              "verify": "fail",
              "err": "Confirm password is incorrect!",
              "username": `${db.username}`,
              "gender": `${db.gender}`,
              "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
              "country": `${db.country}`
            })
            data.new_password = "";
            data.confirm_new_password = "";
          } else {
            if (data.new_password.length > 0) {
              //updata server
              this.knex("user_profile")
                .where("id", req.user.id)
                .update({
                  password: data.new_password
                })
                .then(() => {
                  res.json({
                    "verify": "success",
                    "username": `${db.username}`,
                    "gender": `${db.gender}`,
                    "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
                    "country": `${db.country}`
                  })
                })
            }
          }
        } else {
          //username edit
          if (data.new_username.length > 0) {
            //updata server
            this.knex("user_profile")
              .where("id", req.user.id)
              .update({
                username: data.new_username
              })
              .then(() => {
                res.json({
                  "verify": "success",
                  "username": `${data.new_username}`,
                  "gender": `${db.gender}`,
                  "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
                  "country": `${db.country}`
                })
              })
          }
          //password edit
          if (data.new_password.length > 0) {
            //updata server
            this.knex("user_profile")
              .where("id", req.user.id)
              .update({
                password: data.new_password
              })
              .then(() => {
                res.json({
                  "verify": "success",
                  "username": `${db.username}`,
                  "gender": `${db.gender}`,
                  "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
                  "country": `${db.country}`
                })
              })
          }
          //gender edit
          if (data.new_gender.length > 0) {
            //updata server
            this.knex("user_profile")
              .where("id", req.user.id)
              .update({
                gender: data.new_gender
              })
              .then(() => {
                res.json({
                  "verify": "success",
                  "username": `${db.username}`,
                  "gender": `${data.new_gender}`,
                  "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
                  "country": `${db.country}`
                })
              })
          }
          //birthday edit
          if (data.new_birthday.length > 0) {
            //updata server
            this.knex("user_profile")
              .where("id", req.user.id)
              .update({
                date_of_birth: data.new_birthday
              })
              .then(() => {
                res.json({
                  "verify": "success",
                  "username": `${db.username}`,
                  "gender": `${db.gender}`,
                  "birthday": `${data.new_birthday}`,
                  "country": `${db.country}`
                })
              })
          }
          //Contry edit
          if (data.new_country.length > 0) {
            //updata server
            this.knex("user_profile")
              .where("id", req.user.id)
              .update({
                country: data.new_country
              })
              .then(() => {
                res.json({
                  "verify": "success",
                  "username": `${db.username}`,
                  "gender": `${db.gender}`,
                  "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
                  "country": `${data.new_country}`
                })
              })
          }
        }
      })
  }
  deleteSetting(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        fs.unlink("./public/image/uploaded/userIcon.png", (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.render("page/setting", {
          icon: ""
        });
      })
  }

  putSolgan(req, res) {
    let data = req.body.input
    //json to object
    data = JSON.parse(data)
    if (data.solgan.length < 1) {
      data.solgan = ""
    }
    //updata server
    this.knex("user_profile")
      .where("id", req.user.id)
      .update({
        solgan: data.solgan
      })
      .then(() => {
        res.json({
          "solgon": `${data.solgan}`
        })
      })
  }
  getApiSetting(req, res) {
    let files = fs.readdirSync("./public/image/photo");
    res.json({
      "photo": files
    })
  }
  getGroupSetting(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        if (db.group !== null) {
          res.json({
            "group": "false",
            "err": "One account create a group only!"
          })
        } else if (db.gender === "group") {
          res.json({
            "group": "false",
            "err": "Create group by user right only!"
          })
        } else {
          res.json({
            "group": "true"
          })
        }
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