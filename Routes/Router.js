const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/', (req, res) => {
  res.render('main.ejs');
});

router.get('/about', (req, res) => {
  res.render('about.ejs');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard.ejs');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
    .save()
    .then(() => {
      res.render('dashboard.ejs');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
