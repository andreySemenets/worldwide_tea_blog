const router = require('express').Router();
const { Tea, User, Country, Comment, TeaCountry } = require('../db/models');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
  let allPost = await Tea.findAll({ include: [Country], raw: true })
  allPost = allPost.map((el) => {
    el.countryName = el['Countries.name'];
    return el;
  });
  res.render('allPosts', { allPost });
});

router.get('/new', auth, async (req, res) => {
  res.render('addNew');
});

router.post('/new', auth, async (req, res) => {

  const { name, type, description, link, country } = req.body;
  try {
    const newPost = await Tea.create({ name, type, description, link });
    const newCountry = await Country.findOne({ where: { name: country }, raw: true })
    const newTeaCountry = await TeaCountry.create({ tea_id: newPost.dataValues.id, country_id: newCountry.id })
    res.status(200).end()
  } catch (error) {
    console.log('Err', error.message);
  }
})

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    let onePostById = await Tea.findOne({ include: [Country] , where: { id } });
    countryName = onePostById.Countries[0].name
    let allComment = await Comment.findAll({ include: [User], raw: true, where: { tea_id: id } });
    allComment = allComment.map((el) => {
      el.commentName = el['User.name'];
      return el;
    });
    res.render('post', { onePostById, allComment, countryName })
  } catch (error) {
    console.log('Err', error.message);
  }
})

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Tea.destroy({ where: { id } });
    res.status(200).end();
  } catch (error) {
    console.log('Err', error.message);
  }
});

router.get('/edit/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const onePostById = await Tea.findOne({ where: { id }, raw: true });
    res.render('edit', { onePostById });
  } catch (error) {
    console.log('Err', error.message);
  }
});

router.patch('/edit/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const onePostById = await Tea.findOne({ where: { id } });
    await onePostById.update({ ...req.body });
    res.status(200).end();
  } catch (error) {
    console.log('Err', error.message);
  }
})

router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const user_id = res.locals.userId
  const { comments } = req.body;
  try {
    const newComment = await Comment.create({ tea_id: id, user_id, comments });
    res.status(200).end();
  } catch (error) {
    console.log('Err', error.message);
  }
})

module.exports = router;
