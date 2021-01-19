var async = require("async");
const attendance = require("../models/attendance");

function findbyId(filter,cb){
    attendance.find(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

function save(data,cb){
    let new_attendance=new attendance(data);
    new_attendance.save(data,function(err){
        if(err){
            cb(err)
        }
        else{
          cb(null)
        }
     });
}


module.exports={
    findbyId:findbyId,
    save:save,
}