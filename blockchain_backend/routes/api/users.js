const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const validator = require('email-validator');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email || !validator.validate(user.email)) {
    return res.status(422).json({
      message: "Please provide a valid email address."
    });
  } 

  if(!user.password || !user.name || !user.house || !user.street || !user.country || !user.postal || !user.contact) {
    return res.status(422).json({
      message: "Please fill in all the fields."
    });
  }

  user.role = "retailer";
  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => {
      res.status(200).json({ 
        user: finalUser.toAuthJSON(),
        role: user.role
      })
    }, (err) => {
      if (err.code === 11000)
        res.status(401).json({
          message: "Unable to create user"
        })
    });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(401).json({
      message: "Email is required"
    });
  } 

  if(!user.password) {
    return res.status(401).json({
      message: "Password is required"
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return res.status(401).json({
        message: "Invalid user"
      });
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.status(200).json({ 
        user: user.toAuthJSON(),
        role: user.role,
      });
    }

    return status(400).info;
  })(req, res, next);
});

router.get('/getAddress', (req, res, next) => {
  let userID = req.query.userID
  Users.findOne({ email : userID })
  .then((user) => {
    
    if(!user) {
      return res.status(401).json({
        message: "Invalid retailer"
      });
    }

    return res.status(200).json({
      userAddress: {
        house: user.house,
        street: user.street,
        country: user.country,
        postal: user.postal
      } 
    })
  }, (err) => {
    return res.status(500).json({
      message: "Internal server error"
    })
  });
})

module.exports = router;
