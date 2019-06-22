const jwt = require('jsonwebtoken');
const User = require('../models/User');
const role=require('./role');

module.exports = async function auth (req, res, next) {
    //check header contains a token
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied!');

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        //get user with the id of the token
        let user = await User.findById(decoded._id);

        //find authorized URLs with the user type
        if(role[user.role].find(function(url){ return url==req.baseUrl})){
                req.user=decoded       
                next();
        }else{
        return res.status(401)
                .send('Access Denied: You dont have correct privilege to perform this operation');
        }

    }catch (err) {
        console.log(err);
        res.status(400).send('invalid token!');
    }

}




    //verify the token
    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //     req.user = verified;
    //     next();
    // }catch (err) {
    //     res.status(400).send('invalid token!');
    // }
