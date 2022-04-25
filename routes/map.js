const router = require('express').Router();
const { Country } = require('../db/models');

router.get('/', async (req, res) => {
  res.render('mapCode.hbs');
});

router.get('/country',async (req, res) => {
  res.render('country.hbs');
});

router.get('/country/:id', async (req, res) => {
  console.log('lll');
  const { id } = req.params;
  console.log(id);
  let countryPostById = await Tea.findAll({ include: [Country], where: { id } });
  countryName = countryPostById.Countries[0].name
  console.log(countryPostById.Countries[0].name, '---------')
  res.render('country.hbs', { countryPostById, countryName });
});


module.exports = router;


