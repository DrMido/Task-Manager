const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('main.ejs');
});

router.get('/about', (req, res) => {
  res.render('about.ejs');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard.ejs');
});

module.exports = router;
