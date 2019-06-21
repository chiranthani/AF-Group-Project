const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const {loginValidation} = require('../validation');


//login
router.post('/', async (req, res) => {
    //validating user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user already exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');

    //checking password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Password is incorrect');

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json(token);

});


module.exports = router;