const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const nodemailer = require('nodemailer');
const {registerValidation} = require('../validation');

//get all users
router.get('/', verify, async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
    
});


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

        //email login credentials for lecturers
        if(req.body.role === 'lecturer'){
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Login info',
                text: `user name: ${req.body.email} \n Password: ${req.body.password}`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });

        }
    });
  
    

module.exports = router;