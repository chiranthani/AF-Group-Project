const Assignment = require('../models/Assignment');


var AssignmentController = function(){
    this.insertAssignment = ()=>{
        return new Promise((resolve,reject)=>{
            Course.save().then((data)=>{
                resolve({status:200,message:'New Assignment added successfully'+ data});
            }).catch((err)=>{
                reject({status:500,message:'Error: '+err});
            });
        })
    };

    this.getAssignment = ()=>{
        return new Promise((resolve,reject)=>{
            Assignment.find().then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'Assignment not found. Error: '+err});
            })
        });
    };

    this.getAssignmentByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Assignment.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'Assignment not found. Error: '+err});
            })
        });
    };

    this.updateAssignment = (id,data)=>{
        return new Promise((resolve,reject)=>{

            let assignment = {

                courseCode:data.courseCode,
                title:data.title,
                due_date:data.due_date,
                file_submissions:data.file_submissions
            };
            Assignment.findByIdAndUpdate({_id: id},course).then(()=>{
                resolve({status:200,message:'Assignment updated successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Assignment updating failed. Error: '+err});
            });
        })
    };

    this.delete = (id)=>{
        return new Promise((resolve,reject)=>{
            Assignment.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:'Assignment deleted successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Data not found. Error: '+err});
            })
        });
    }
};

module.exports = new AssignmentController();

