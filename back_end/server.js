const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes');
const mongoose = require("mongoose");
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
app.set("view engine", "ejs");

mongoose.connect('mongodb://127.0.0.1:27017/SLIIT', {useNewUrlParser : true}). then(()=>{
    console.log('connected to DBss');
}).catch ((err)=>{
    console.log(err);
});
var gameSchema = new mongoose.Schema({
   
    fileName: String

});
var Game = mongoose.model("Game", gameSchema);



app.post('/upload',function(req, res) {
   //   var data = req.body;
	    var data = req.body;

    //a variable representation of the files
    var gameFile = req.files.file;
    

    //Using the files to call upon the method to move that file to a folder
    gameFile.mv("public/" + gameFile.name, function(error){
        if(error){
            console.log("Couldn't upload the game file");
            console.log(error);
        }else{
            console.log("Game file succesfully uploaded.");
        }
    });
	
	Game.create({

        fileName: gameFile.name
   
    }, function(error, data){
        if(error){
            console.log("There was a problem adding this game to the database");
        }else{
            console.log("Game added to database");
            console.log(gameFile.name);
        }

    });
	res.redirect("/uploadView");

});

app.get("/uploadView", function (req, res) {
 
    Game.find({}, function(error, games){
        if(error){
            console.log("There was a problem retrieving all of the games from the database.");
            console.log(error);
        }else{
         res.json(games);
            
        }
    });

});

/*app.post("/upload", function(req, res){
    var data = req.body;

    //a variable representation of the files
    var gameFile = req.file.gamefile;
   

    //Using the files to call upon the method to move that file to a folder
    gameFile.mv("public/games/" + gameFile.name, function(error){
        if(error){
            console.log("Couldn't upload the game file");
            console.log(error);
        }else{
            console.log("Game file succesfully uploaded.");
        }
    });
});
    
*/
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server is running "+PORT)
    }
});

