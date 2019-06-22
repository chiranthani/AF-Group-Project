const router = require('express').Router();
const Lecturer = require('../models/Lecturer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

//get lecturers
router.get('/', verify, async (req, res) => {
    try{
        const lecturers = await Lecturer.find();
        res.json(lecturers);
    }catch(err){
        res.json({message: err});
    }
    
});

//create a lecturer
router.post('/', verify, async (req, res) => {
    const lecturer = new Lecturer({
        name: req.body.name,
        ID_number: req.body.ID_number,
        login_credentials: req.body.login_credentials
    });

    try{
        const savedLecturer = await lecturer.save();
        res.json(savedLecturer);
    }catch(err){
        console.log(err);
        res.json({message: err});
    }
    
});

//get one lecturer
router.get('/:id', verify, async (req, res) => {
    try{
        const lecturer = await Lecturer.findById(req.params.id);
        res.json(lecturer);
    }catch(err){
        res.json({message: err});
    }
    
});


//update a lecturer
router.patch('/:id', verify, async (req, res) => {
    try{
        const updatedLecturer = await Lecturer.updateOne(
            {_id: req.params.id},
            {$set: {name: req.body.name, 
                    ID_number: req.body.ID_number,
                    login_credentials: req.body.login_credentials}});
        
            res.json(updatedLecturer);
    }
    catch(err) {
        res.json({message: err});
    }
});


//delete a lecturer
router.delete('/:id', verify, async (req, res) => {
    try{
        const removedLecturer = await Lecturer.deleteOne({_id: req.params.id});
        res.json(removedLecturer);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;