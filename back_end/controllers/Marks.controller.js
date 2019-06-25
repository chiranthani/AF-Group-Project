const Marks = require('../models/marks');
const MarkSheet = require('../models/markSheetUpload');
const marksNotifyMsg = require('../models/marksNotifyMessage');

var MarksController = function(){
   	
	//sort the max assignmentNo value
	this.findAssignmentNo = ()=>{
		return new Promise((resolve,reject)=>{
            Marks.find().sort({'assignmentNo': -1}).limit(1).then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};
	
	// find student marks list(select * from marks where moduleID=? AND assignmentNo=?)
	
	this.findForViewMarks = (moduleID,assignmentNo) =>{
		return new Promise ((resolve,reject)=>{
			console.log(moduleID,assignmentNo); // testing purpose
			Marks.find({"$and":[{"moduleID": moduleID , "assignmentNo":assignmentNo}]}).then((data)=>{
				 resolve({status:200,message:data});
			}).catch((err) =>{
				reject({status:500,message:'not found'+err});
			})
			
		});
		
	};
	
	// insert marks array of object
		
	this.addData = (data) =>{
        return new Promise((resolve,reject)=>{ 
			console.log(data);// display array of object 
			
        //use 'create' for insert the multiple json objects
		  Marks.create( data, function(error){
					if(error){
						reject({status:200,message:"failed"+error});
					}else{
						resolve({status:200, message:"successfully added"});
					}

				});	
        });
    };
	
	// update marks array of json object
	//pls check this function isn't properly working
	this.update = (data)=>{
        return new Promise((resolve,reject)=>{
			
			console.log(data);
			var marks = JSON.stringify(data);
			//input pass the multiple json objects.  
			marks.update([{$set:{data}}]).then(()=>{
			resolve({status:200,message:'Marks updated successfully'});
			}).catch((err)=>{
				reject({status:500,message:'Updating failed due to Error: '+err});
			});
								
        })
    };
	
	//upload mark sheets
	this.upload = (data)=>{
        return new Promise((resolve,reject)=>{
			console.log(data.name);
			//Using the files to call upon the method to move that file to a folder
			data.mv("markSheets/" + data.name, function(error){
				if(error){
					console.log("Couldn't upload the mark sheet");
					console.log(error);
				}else{
					console.log("Mark sheet succesfully uploaded.");
				}
			});	//add to the database 		
				MarkSheet.create({
					fileName: data.name	,
					date: new Date()
					
				}, function(error, data){
					if(error){
						reject({status:200,message:"failed"+error});
					}else{
						resolve({status:200, message:"successfully added"});
					}
				});				
        })
    };
	
	//notification message add to the db
	this.addMessage = (data) =>{
		return new Promise((resolve,reject)=>{ 
			console.log(data);
		
		  marksNotifyMsg.create({
					fileName: data.fileName,
					message: data.message,
					date: new Date()
					
				}, function(error, data){
					if(error){
						reject({status:200,message:"failed"+error});
					}else{
						resolve({status:200, message:"successfully added"});
					}
				});				
        })
    };
		// old use function
	this.getAll = () =>{
        return new Promise((resolve,reject)=>{
            Marks.find().then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};
		// old use function
	this.retrieveByID=(id)=>{
			return new Promise ((resolve,reject)=>{
				 console.log(id);
				Marks.find({'studentID':{ $in: [id]}}).then((data)=>{
					resolve({status:200,message:data});

				}).catch((err)=>{
					reject({status:500,message:"not found"+err});
				})
			});
		};
  
};
module.exports = new MarksController();