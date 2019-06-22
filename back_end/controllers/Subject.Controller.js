const Subject = require('../models/Subject');

var SubjectController = function(){
    this.insertSubject = ()=>{
        return new Promise((resolve,reject)=>{
            Subject.save().then((data)=>{
                resolve({status:200,message:'Subject added successfully'+ data});
            }).catch((err)=>{
                reject({status:500,message:'Error: '+err});
            });
        })
    };

    this.getSubject = ()=>{
        return new Promise((resolve,reject)=>{
            Subject.find().then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'Subject not found. Error: '+err});
            })
        });
    };

    this.getSubjectByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Subject.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'Subject not found. Error: '+err});
            })
        });
    };

    this.updateSubject = (id,data)=>{
        return new Promise((resolve,reject)=>{

            let subject = {
                subjectCode:data.subjectCode,
                subjectName:data.subjectName,
                Courses:data.Courses

            };
            Subject.findByIdAndUpdate({_id: id},subject).then(()=>{
                resolve({status:200,message:'Subject updated successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Subject updating failed. Error: '+err});
            });
        })
    };

    this.deleteSubject = (id)=>{
        return new Promise((resolve,reject)=>{
            Subject.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:'Subject deleted successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Data not found. Error: '+err});
            })
        });
    }
};

module.exports = new SubjectController();