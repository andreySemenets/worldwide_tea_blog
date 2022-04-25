const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const mapRouter = require('./routes/map');

const { User } = require('./db/models');

const userMiddleware = require('./middlewares/user');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const dbConnectionCheck = require('./db/dbConnectionCheck');

dbConnectionCheck();

const fileStoreOptions = {};

const sessionConfig = {
  name: 'sid',
  store: new FileStore(fileStoreOptions),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
};

app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'views'));
app.set('trust proxy', true);

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use(async (req, res, next) => {
  const userId = req.session?.user?.id;
  if (userId) {
    const currentUser = await User.findOne({ where: { id: userId }, raw: true });
    if (currentUser) {
      res.locals.name = currentUser.name;
      res.locals.userId = currentUser.id;
      res.locals.admin = currentUser.position === 'admin';
    }
  }
  next();
});

app.use('/', authRouter);
app.use('/posts', postRouter);
app.use('/map', mapRouter);

app.listen(PORT, () => {
  console.log(`It's all good in da hood: ${PORT}`);
});
