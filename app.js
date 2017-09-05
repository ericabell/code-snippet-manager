const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      mongoDBStore = require('connect-mongodb-session')(session),
      bodyParser = require('body-parser');


// app-level connect to snippet database
// used for robot directory info and auth for passport
const mongoose = require('mongoose');

let mLabUsername = process.env.MLABUSER;
let mLabPassword = process.env.MLABPASSWORD;

let url=`mongodb://${mLabUsername}:${mLabPassword}@ds123124.mlab.com:23124/code-snippet-manager-project`
// let url='mongodb://localhost:27017/code-snippet-manager-project';
mongoose.connect(url,
                 {useMongoClient: true},
                 (err)=> {
                   if(err) throw err;
                   else {console.log('connection to db successful');}
                 });

// ROUTES
var index = require('./routes/index');
var api = require('./routes/api');
let auth = require('./routes/auth');

// the schema for auth
let User = require('./models/auth.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(function(username, password, done) {
    console.log(`in passport LocalStrategy`);
    User.findOne({username: username,
    }, function(err, user) {
      if(err) {
        return done(err);
      }

      if(!user) {
        return done(null, false, {message: 'incorrect username'});
      }

      if( !user.authenticate(password) ) {
        return done( null, false, {message: 'incorrect password'} );
      }

      return done(null, user);
    })
}));

passport.serializeUser(function(user, done) {
  console.log('in serializeUser');
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  console.log('in deserializeUser');
  User.findById(id, function(err, user) {
    done(err, user);
  })
});

// set up the express-session store to use MongoDB
// this allows us to kill the server and still have session data available
let store = new mongoDBStore(
  {
    uri: `mongodb://${mLabUsername}:${mLabPassword}@ds123124.mlab.com:23124/code-snippet-manager-project`,
    collection: 'session-store'
  }
);

store.on('error', (e) => {
  assert.ifError(e);
  assert.ok(false);
});

// set up express-session
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 //1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/', auth);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
