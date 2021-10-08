const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require("./models");

const router = require("./routes");

const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/", express.static("public"));
app.use('/auth', router.auth);
app.use('/users', router.users);
app.use('/posts', router.posts);
app.use('/comments', router.comments);

// ELB를 위한 헬스체크
app.get("/healthcheck", (_, res) => res.send("Im alive"));

app.get("/*", (req, res) =>  res.sendFile(__dirname + "/public/index.html"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.sendFile(__dirname + "/public/index.html");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

db.sequelize.sync({force: true});

module.exports = app;
