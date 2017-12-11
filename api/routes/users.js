const express = require('express');
const User = require('../models/User');
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/auth');

const router = new express.Router();

router.get('/', authMiddleware.signInWithCookiesForUser, (req, res) => {
  User.find()
  .populate('skill')
  .then(users => res.json({ data: users }))
  .catch(error => res.json({ error: error.message }))
});

// Register
router.post('/auth/register', 
  // Middlware Chain
  (req, res, next) => {
    console.log('Processing user registration with: ', req.body);
    authMiddleware.register(req, res, next)
  },
  // Handler
  // authMiddleware.signInWithJWTForUser
  authMiddleware.signInWithCookiesForUser
)

router.post('/auth',
  // Middleware Chain
  authMiddleware.signIn,
  // Handler
  // authMiddleware.signInWithJWTForUser
  authMiddleware.signInWithCookiesForUser
)

router.post('/', (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user).end();
    })
    .catch(error => res.json({ error }))
});

module.exports = router;
