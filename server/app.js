/* eslint-disable global-require */
const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.dev";
dotenv.config({path: `${__dirname}/${envFile}`});
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const db = require("./models");
const router = require("./routes");

if(process.env.NODE_ENV === 'production') require('newrelic');

const app = express();
app.use(logger("combined"));
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://www.mellowboard.xyz",
      "https://test.doldolma.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", express.static("public"));
app.use("/auth", router.auth);
app.use("/users", router.users);
app.use("/posts", router.posts);
app.use("/comments", router.comments);

// ELB를 위한 헬스체크
app.get("/healthcheck", (_, res) => res.send("Im alive"));

app.get("/*", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// catch 404 and forward to error handler
app.use((req, res, next) => res.sendFile(`${__dirname}/public/index.html`));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

db.sequelize.sync();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening : ${PORT}`));

module.exports = app;
