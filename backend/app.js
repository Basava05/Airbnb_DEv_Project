const path = require("path");

if(process.env.NODE_ENV != "production"){
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");

const flash  = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "../frontend/public")));

// const store = MongoStore.create({
//   mongoUrl:MONGO_URL,
//   crypto:{
//     secret:process.env.SECRET,
//   },
//   touchAfter:24*3600,
// });

// store.on("error",()=>{
//   console.log("Error is mongo session store",err);
// });

// const sessionOptions = {
//   store,
//   secret:process.env.SECRET,
//   resave:false,
//   saveUninitialized:true,
//   cookie:{
//     expire:Date.now()+7*24*60*60*1000,
//     maxAge:7*24*60*60*1000,
//     httpOnly:true,
//   },
// };

const sessionOptions = {
  secret: process.env.SECRET || "khdfphqnnnbhteohqkldpwhgl",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
}

// app.get("/", (req, res) => {
//   res.send("Working!");
// });


app.use(session(sessionOptions));
app.use(flash());
//always use the flash before the routings 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
  next();
});

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.use("/{*catchAll}",(req,res,next)=>{
   next(new ExpressError(404,"Page Not Found!"));
});

app.use((err, req, res, next) => {
  let{statusCode = 500,message = "Page Not Found!"} = err;
//   res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
});

