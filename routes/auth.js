const authRouter = require('express').Router();
const User = require('../models/user');
const { calculateToken } = require('../helpers/users');

authRouter.post('/checkCredentials', (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (!user) res.status(401).send('Invalid credentials');
    else {
      User.verifyPassword(password, user.hashedPassword).then(
        (passwordIsCorrect) => {
          if (passwordIsCorrect) {
            const userId = user.id;
            const token = calculateToken({email, userId});
            console.log(token)
            res.cookie('user_token', token)
            res.send()
          }
          else res.status(401).send('Invalid credentials');
        }
      );
    }
  });
});

module.exports = authRouter;