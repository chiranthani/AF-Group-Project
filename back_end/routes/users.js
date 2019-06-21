const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const {registerValidation} = require('../validation');


router.post('/register', verify, async (req, res) => {
    
        //validating user
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        //checking if the user already exists
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists.');
    
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //creating a new user
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });
        try {
            const savedUser = await user.save();
            res.send({user: user._id});
    
        }catch(err) {
            res.status(400).send(err);
        }
    });
  
    

module.exports = router;