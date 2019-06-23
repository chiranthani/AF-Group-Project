const Marks = require('../models/marks');
const MarkSheet = require('../models/markSheetUpload');

var MarksController = function(){
   
    this.getAll = () =>{
        return new Promise((resolve,reject)=>{
            Marks.find().then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};
	
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
		//pls check this function isn't correctly working
	this.addData = (data) =>{
        return new Promise((resolve,reject)=>{ 
			var marks = JSON.stringify(data);
			console.log(marks); // display array of object
			
			/*marks.save(data).then(()=>{
                resolve({status:200, message:"successfully added"});
            }).catch((err)=>{
                reject({status:200,message:"failed"+err});
            });*/
			
			/*Document objArray = new Document();
			objArray.append("_id", new ObjectId());
			objArray.append("Array",(ArrayList<Document>) JSON.parse("data"));*/
			//var marks = JSON.stringify(data);
			//console.log(marks);
			//_id: new ObjectId(),
          //try the insertMany function but isn't working. (my mongodb version (3.0))
		  marks.insert([{ 
				
				studentID:studentID,
				moduleID:moduleID,
				assignmentNo:assignmentNo,
				mark:mark
			  
			}], function(error, data){
					if(error){
						reject({status:200,message:"failed"+err});
					}else{
						resolve({status:200, message:"successfully added"});
					}

				});	
        });
    };
	
	// update marks array of object
	//pls check this function isn't correctly working
	this.update = (data)=>{
        return new Promise((resolve,reject)=>{
			console.log(data);
			var marks = JSON.stringify(data);
            marks.update([{$set:{data}}]).then(()=>{
                resolve({status:200,message:'Marks updated successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Updating failed due to Error: '+err});
            });
        })
    };
	
	this.upload = (data)=>{
        return new Promise((resolve,reject)=>{
			console.log(data.name);
			//Using the files to call upon the method to move that file to a folder
			data.mv("markSheets/" + data.name, function(error){
				if(error){
					console.log("Couldn't upload the game file");
					console.log(error);
				}else{
					console.log("Game file succesfully uploaded.");
				}
			});	//add to the database		
				MarkSheet.create({
					fileName: data.name	
					
				}, function(error, data){
					if(error){
						reject({status:200,message:"failed"+err});
					}else{
						resolve({status:200, message:"successfully added"});
					}

				});			
	
        })
    };
		
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