const express = require('express')
const router = express.Router()


// importing data model schemas
const { users } = require('../models/models')

// GET org
router.post('/login', (req, res, next) => {
  const u = users.findOne({email: req.body.email}, function(err, user, data) {
    if (!user.validPassword(req.body.passwd)) {
      res.status(403).send('wrong password')
            //password did not match
    } else {
      res.status(200).send({data: data})
      // password matched. proceed forward
    }
  });
})

router.post('/create', (req, res) => {
  var new_user = new users({
    email: req.body.email
  });
  console.log(req.body)
  new_user.passwd = new_user.hash(req.body.passwd);
  res.status(200).send(new_user.passwd)
  new_user.save();
})

module.exports = router