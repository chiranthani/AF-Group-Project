const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const random = require('random-string-generator');
const nodemailer = require('nodemailer');
const {loginValidation} = require('../validation');


//login
router.post('/login', async (req, res) => {
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

//send token to reset password
router.post('/requestPasswordReset', async (req, res)=>{

    //checking if the user already exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');

    //generate random token
    const randomToken = random(12);

    //store random token
    try{
        const updatedUser = await User.findByIdAndUpdate(
            {_id: user._id},
            {$set: {resetToken: randomToken}});
        
            console.log(updatedUser.resetToken);
            //email the token
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
                }
            });

            let mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Password Reset',
                text: randomToken
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });

            res.json({message: 'Your email has been sent'});
            
    }
    catch(err) {
        res.json({message: err});
    }

    

});

//Reset password
router.post('/resetPassword', async (req, res) => {

    //verify token
    const user = await User.findOne({resetToken: req.body.resetToken});
    if(!user) return res.status(400).send('Something went wrong');

    //compare password and confirm password values
    if(req.body.password === req.body.confirmPassword){
        //store new password
        try{
            const updatedUser = await User.updateOne(
                {_id: user._id},
                {$set: {newPassword: req.body.password}});

            res.json(updatedUser);
        }
        catch(err) {
            res.json({message: err});
        }
    }
    else{
        return res.status(400).send('password confirmation does not match');
    }

});   



module.exports = router;