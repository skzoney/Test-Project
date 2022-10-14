var express = require('express');
var router = express.Router();


const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  }
  next();
};


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Home Page' })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});


module.exports = router;
