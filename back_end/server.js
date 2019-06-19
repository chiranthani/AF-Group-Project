const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes');
const app = express();
const PORT = 4005;
//var multer = require('multer');
const fileUpload = require('express-fileupload');

app.use(fileUpload());
//app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',appRoutes);

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server is running "+PORT)
    }
});

