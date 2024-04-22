const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const passport = require("passport");

dotenv.config({ path: "./config/.env" });

const connectDB = require("./config/database");

require("./config/passport")(passport);

connectDB();

app.set("trust proxy", true);
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", homeRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT} ... betta go catch it`
  );
});
