const Course = require('../models/Course');

var CourseController = function(){
    this.insertCourse = ()=>{
        return new Promise((resolve,reject)=>{
            Course.save().then((data)=>{
                resolve({status:200,message:'New Course added successfully'+ data});
            }).catch((err)=>{
                reject({status:500,message:'Error: '+err});
            });
        })
    };

    this.getCourse = ()=>{
        return new Promise((resolve,reject)=>{
            Course.find().then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'Course not found. Error: '+err});
            })
        });
    };

    this.getCourseByID = (id)=>{
        return new Promise((resolve,reject)=>{
            Course.findById(id).then((data)=>{
                resolve({status:200,message:data});
            }).catch((err)=>{
                reject({status:500,message:'Course not found. Error: '+err});
            })
        });
    };

    this.updateCourse = (id,data)=>{
        return new Promise((resolve,reject)=>{

           let course = {
                courseCode:data.courseCode,
                courseName:data.courseName,
                year:data.year,
                Subjects:data.Subjects
            };
            Course.findByIdAndUpdate({_id: id},course).then(()=>{
                resolve({status:200,message:'Course updated successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Course updating failed. Error: '+err});
            });
        })
    };

    this.delete = (id)=>{
        return new Promise((resolve,reject)=>{
            Course.findByIdAndDelete(id).then(()=>{
                resolve({status:200,message:'Course deleted successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Data not found. Error: '+err});
            })
        });
    }
};

module.exports = new CourseController();