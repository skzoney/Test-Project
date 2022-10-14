const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../model/user')
const session = require('express-session');

router.post('/register', async (req, res) => {
    const { username, password, firstname, lastname, image } = req.body;
    
    const uname = await User.findOne({
      username
    });
    
    // simple validation
    let userCheck = /^[A-Za-z]\w{4,12}$/
    if (!username || !password || !firstname || !lastname || !image) {
      return res.render('register', { message: 'Please try again' });
    }
    else if(username.match(userCheck) && !uname){
      const passwordHash = bcrypt.hashSync(password, 10);
      const user = new User({
      firstname,
      lastname,
      username,
      image,
      password: passwordHash
    });
  
    await user.save();
    req.session.user = user;
    res.render('login', { user });
    }else return res.render('register', { message: 'Please try again' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username
  });

  if (user) {

    const isCorrect = bcrypt.compareSync(password, user.password);
    if (isCorrect) {
        req.session.user = user;
        return res.render('edit', { user });
      } else {
        return res.render('login', { message: 'Username or Password incorrect' });
      }
    } else {
    return res.render('login', { message: 'Username or Password incorrect' });
  }

});

router.post('/edit', async (req, res) => {
  const { id,password, firstname, lastname, image } = req.body;
  const idCheck = await User.findOne({id});
  const chfname = await User.findOne({firstname});
  const chlname = await User.findOne({lastname});
  const chpass = await User.findOne({username});
  if (chpass) {
    const isCorrect = bcrypt.compareSync(password, user.password);
    if (isCorrect) {
        req.session.user = user;
        return res.render('edit', { chpass });
      } 
    }
  if(idCheck.match(id) && !chfname && !chlname && !chpass){
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({
      firstname,
      lastname,
      image,
      password: passwordHash
    })
    await user.update();
    req.session.user = user;
    res.render('login', { user });
  }

  })
    
module.exports = router;
