const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/", express.static("public"));
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// ELB를 위한 헬스체크
app.get("/healthcheck", (_, res) => res.send("Im alive"));

app.get("*", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
})

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

const db = require("./models");
if(process.env.NODE_ENV !== "production"){
  db.sequelize.sync({alter: true});
}


module.exports = app;
