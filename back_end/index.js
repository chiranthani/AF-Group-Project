const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const pdf = require('html-pdf');
const pdfTemplate = require('./pdfFormat');

//Importing Routes

const ModuleRoutes = require('./routes/Module.Routes');
const MarksRoutes = require('./routes/Marks.Routes');
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
    'mongodb://127.0.0.1:27017/SLIIT', 
    {useNewUrlParser: true},
    () => console.log('Connected to database')
);


//require('./seed');

//Middlewares
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Route middlewares

app.use('/api/list', listRoutes);
app.use('/api/module', ModuleRoutes);
app.use('/api/marks', MarksRoutes);
app.use('/api/user/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/lecturer', lecturerRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/Course', courseRoutes);
app.use('/api/Subject', subjectRoutes);

//Don't remove this route
// get the saved rezultati.pdf file 
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/rezultati.pdf`);
});

app.listen(4000, () => console.log('Server up and running'));