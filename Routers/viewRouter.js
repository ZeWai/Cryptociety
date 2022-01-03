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
    router.get("/", isLoggedIn, this.gethomepage.bind(this));
    router.get("/index", isLoggedIn, this.getIndex.bind(this));
    router.get("/index/group", isLoggedIn, this.getgroup.bind(this));
    router.get("/index/follower", isLoggedIn, this.getfollower.bind(this));
    router.get("/index/chatroom", isLoggedIn, this.getchatroom.bind(this));
    router.get("/api/index", isLoggedIn, this.getApiIndex.bind(this));
    router.get("/profile", isLoggedIn, this.getProfile.bind(this));
    router.get("/admin", isLoggedInAdmin, this.getAdmin.bind(this));
    router.get("/setting", isLoggedIn, this.getSetting.bind(this));
    router.post("/setting", isLoggedIn, this.postSetting.bind(this));
    router.put("/setting", isLoggedIn, this.putSetting.bind(this));
    router.delete("/setting", isLoggedIn, this.deleteSetting.bind(this));
    router.get("/group/setting", isLoggedIn, this.getGroupSetting.bind(this));
    router.post("/group/create", isLoggedIn, this.postGroupCreate.bind(this));
    router.get("/api/setting", isLoggedIn, this.getApiSetting.bind(this));
    router.get("/download/album/:name", isLoggedIn, this.getDownloadAlbum.bind(this));
    router.delete("/delete/album/", isLoggedIn, this.deleteAlbum.bind(this));
    router.get("/market", isLoggedIn, this.getMarket.bind(this));
    router.get("/404", this.get404.bind(this));
    router.get("/logout", isLoggedIn, this.getLogout.bind(this));
    return router;
  }
  getLogout(req, res) {
    req.logout();
    res.redirect('/');
  };
gethomepage(req, res) {
    res.redirect('/index');
  };
  getLogin(req, res) {
    res.render("page/login", {
      title: "Login",
      page: "login",
      error: req.flash("error"),
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
          function: "index",
          icon: () => {
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            console.log(iconExists)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
            }
          }
        });
      })
  }
  
  getApiIndex(req, res) {
        res.json({
        "username": req.user.username
    })
  }
 getgroup(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        res.render("page/group", {
          title: "Index",
          page: "index",
          layout: "other",
          username: db.username,
          solgan: db.solgan,
          function: "group",
          icon: () => {
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            console.log(iconExists)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
            }
          }
        });
      })
  }
  getfollower(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        res.render("page/follower", {
          title: "Index",
          page: "index",
          layout: "other",
          username: db.username,
          solgan: db.solgan,
          function: "follower",
          icon: () => {
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            console.log(iconExists)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
            }
          }
        });
      })
  }
 getchatroom(req, res) {
    //Get db data
    this.knex
      .select("*")
      .from("user_profile")
      .then((rows) => {
        let db = rows[req.user.id - 1]
        res.render("page/chatroom", {
          title: "Index",
          page: "index",
          layout: "other",
          function:"chatroom",
          username: db.username,
          solgan: db.solgan,
          function:"chatroom",
          icon: () => {
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            console.log(iconExists)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
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
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
            }
          }
        });
      })
  }

  getSignup(req, res) {
    res.render("page/signup", {
      title: "Signup",
      page: "signup",
      error: req.flash("error"),
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
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
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
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
            }
          }
        });
      })
  }
  postSetting(req, res) {
    let data = req.files.files
    fs.writeFile(`./public/image/uploaded/userIcon_${req.user.id}.png`, data.data, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.render("page/setting", {
          icon: () => {
            //check icon Exists
            const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
            if (iconExists) {
              let img = `/image/uploaded/userIcon_${req.user.id}.png`
              return img;
            } else {
              return `/image/uploaded/userIcon.png`;
            }
          }
        })
      }
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
        } else {
          //check less 6 characters username  
          if (data.new_username) {
            if (data.new_username.length < 6) {
              res.json({
                "verify": "fail",
                "err": "Username can not less than 6 characters!"
              })
              data.new_username = "";
            }
          }
          //check password
          if (data.new_password) {
            if (data.new_password.length < 8 || data.confirm_new_password.length < 8 || data.new_password.length == 0 || data.confirm_new_password.length == 0) {
              res.json({
                "verify": "fail",
                "err": "Password can not less than 8 characters!",
              })
              data.new_password = "";
              data.confirm_new_password = "";
            } else if (data.new_password !== data.confirm_new_password) {
              res.json({
                "verify": "fail",
                "err": "Confirm password is incorrect!",
              })
              data.new_password = "";
              data.confirm_new_password = "";
            }
          }
          //update username
          if (data.new_username.length > 0) {
            //updata server
            this.knex("user_profile")
              .where("id", req.user.id)
              .update({
                username: data.new_username,
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
          //update password
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
          //update gender
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
                  "username": `${db.new_username}`,
                  "gender": `${data.new_gender}`,
                  "birthday": `${db.date_of_birth.getFullYear()}-${db.date_of_birth.getMonth() + 1}-${db.date_of_birth.getDate()}`,
                  "country": `${db.country}`
                })
              })
          }
          //update birthday
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
          //update country
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
    fs.unlink(`./public/image/uploaded/userIcon_${req.user.id}.png`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.render("page/setting", {
      icon: () => {
        //check icon Exists
        const iconExists = fs.existsSync(`./public/image/uploaded/userIcon_${req.user.id}.png`)
        if (iconExists) {
          let img = `/image/uploaded/userIcon_${req.user.id}.png`
          return img;
        } else {
          return `/image/uploaded/userIcon.png`;
        }
      }
    });
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
        } else if (db.admin === "group") {
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
  async postGroupCreate(req, res) {
    let data = req.body.files
    //json to object
    data = JSON.parse(data)
    //check email
    if (data.email_address.length < 8 || data.email_address.length == 0) {
      res.json({
        "create": "false",
        "err": "Incorret email!"
      })
      //check username
    } else if (data.username.length < 6 || data.username.length == 0) {
      res.json({
        "create": "false",
        "err": "Group name can not less than 6 characters!"
      })
      //check password
    } else if (data.password.length < 8 || data.password.length == 0) {
      res.json({
        "create": "false",
        "err": "Password can not less than 8 characters!"
      })
      //check country
    }
    else if (data.country.length < 1) {
      res.json({
        "create": "false",
        "err": "Please select the location!"
      })
    } else {
      //updata server
      await this.knex("user_profile")
        .where("id", req.user.id)
        .update({
          group: data.username,
        })
        .then(() => {
          res.json({
            "create": "true",
            "err": "Group create success!"
          })
        })
      //create group to server
      await this.knex("user_profile")
        .insert({
          email_address: data.email_address,
          username: data.username,
          password: data.password,
          country: data.country,
          solgan: data.solgan,
          admin: data.admin,
          gender: data.gender,
          date_of_birth: data.date_of_birth
        })
    }
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