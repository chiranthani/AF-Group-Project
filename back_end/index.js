const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//Importing Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/List.Routes');
const lecturerRoutes = require('./routes/lecturers');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/Course.Routes');
const subjectRoutes = require('./routes/Subject.Routes');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT, 
    {useNewUrlParser: true},
    () => console.log('Connected to database')
);

//require('./seed');

//Middlewares
app.use(express.json());
//app.use(fileUpload());
//app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Route middlewares
app.use('/api/user/login', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/list', listRoutes);
app.use('/api/lecturer', lecturerRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/Course', courseRoutes);
app.use('/api/Subject', subjectRoutes);


app.listen(4000, () => console.log('Server up and running'));