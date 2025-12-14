const { model } = require("mongoose");
const User = require("../models/user.js");


module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          next(err);
        }
        req.flash("success", "WELL COME TO WOUNDERLUST");
        res.redirect("/listings");
      });

    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };

  module.exports.renderLoginForm =  (req, res) => {
  res.render("users/login.ejs");
};


module.exports.login = async (req, res) => {
    req.flash("success", "WELLCOME BACK TO WOUNDERLUST!");
    let redirecturl = res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
  };

  module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Your are logged out!");
    res.redirect("/listings");
  });
};
