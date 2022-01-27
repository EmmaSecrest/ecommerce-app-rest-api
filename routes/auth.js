const express = require('express');
const authRouter = express.Router();
const { pool } = require('../config')
const { validateEmail, UserByEmailExists } = require('../services/authService');

//Registration - can they register, or do have they already an account

// checking to see if user with that email exists
// might want to add a check to see if it is a legit email

// checking to see if it is a real email

authRouter.get('/', (req, res) => {
    res.send('auth page')
})




//Login - can they login? Do they have an account?



module.exports = authRouter
