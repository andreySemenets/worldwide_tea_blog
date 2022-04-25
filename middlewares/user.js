module.exports = (req, res, next) => {
  console.log('file /middelware/user.js req.session.user :', req.session.user);
  if (req.session.user) res.locals.name = req.session?.user?.name;
  next();
};
