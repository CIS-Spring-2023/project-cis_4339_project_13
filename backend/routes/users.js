const express = require('express')
const router = express.Router()


// importing data model schemas
const { users } = require('../models/models')

// GET org
router.post('/login', (req, res, next) => {
  const u = users.findOne({email: req.body.email}, function(err, user, data) {
    if (!user.validPassword(req.body.passwd)) {
      return res.status(403).send('wrong password')
            //password did not match
    } else {
      console.log(user)
      res.json(user)
      // password matched. proceed forward
    }
  });
  // console.log(u)
})

router.post('/create', (req, res) => {
  var new_user = new users({
    email: req.body.email,
    role: req.body.role
  });
  console.log(req.body)
  new_user.passwd = new_user.hash(req.body.passwd);
  res.status(200).send(new_user.passwd)
  new_user.save();
})

module.exports = router