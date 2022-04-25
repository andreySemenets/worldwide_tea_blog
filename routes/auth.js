const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', (req, res) => {
	res.render('signup.hbs');
});
router.post('/signup', async (req, res) => {
	const { name, email, password } = req.body;
  const position = 'user';
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const user = await User.create({
			name,
			password: hashedPassword,
			email,
			position,
		});
		req.session.user = { id: user.id, name: user.name, position: user.position };
    log
	} catch (err) {
		console.error('Err message:', err.message);
		console.error('Err code', err.code);
	}
	res.status(200).end();
})

router.get('/signin', (req, res) => {
	res.render('signin.hbs');
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ where: { email }, raw: true });
		const isValidPassword = await bcrypt.compare(password, user.password);
		req.session.user = { id: user.id, name: user.name };
	} catch (err) {
		console.error('Err message:', err.message);
		console.error('Err code', err.code);
	}
	res.status(200).end();
})

router.get('/signout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			next(err);
		}
		res.clearCookie('sid');
		res.redirect('/');
	});
});

module.exports = router
