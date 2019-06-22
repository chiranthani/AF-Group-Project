const router = require('express').Router();
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

//get students
router.get('/', verify, async (req, res) => {
    try{
        const students = await Student.find();
        res.json(students);
    }catch(err){
        res.json({message: err});
    }
    
});

//create a student
router.post('/', verify, async (req, res) => {
    const student = new Student({
        name: req.body.name,
        ID_number: req.body.ID_number,
        login_credentials: req.body.login_credentials
    });

    try{
        const savedStudent = await student.save();
        res.json(savedStudent);
    }catch(err){
        console.log(err);
        res.json({message: err});
    }
    
});

//get one student
router.get('/:id', verify, async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
        res.json(student);
    }catch(err){
        res.json({message: err});
    }
    
});

//update a student
router.patch('/:id', verify, async (req, res) => {
    try{
        const updatedStudent = await Student.updateOne(
            {_id: req.params.id},
            {$set: {name: req.body.name, 
                    ID_number: req.body.ID_number,
                    login_credentials: req.body.login_credentials}});
        
            res.json(updatedStudent);
    }
    catch(err) {
        res.json({message: err});
    }
});

//delete a student
router.delete('/:id', verify, async (req, res) => {
    try{
        const removedStudent = await Student.deleteOne({_id: req.params.id});
        res.json(removedStudent);
    }catch(err){
        res.json({message: err});
    }
});



module.exports = router;