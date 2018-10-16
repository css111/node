// 原始版：建立一个数据文件，自己封装增删改查的方法

//职责：操作db.json文件中的数据，只处理数据不关心业务

// var dbPath='./db.json';
// var fs=require('fs');
//  //获取所有学生列表
// exports.find=function(callback){
//      fs.readFile(dbPath,'utf8',function(err,data ){
//          if(err){
//              return callback(err)
//          }
//          callback(null,JSON.parse(data).students)
//      })
// };
//
// //获取单个学生列表
// exports.findId=function(id,callback){
//     fs.readFile(dbPath,'utf8',function(err,data ) {
//         if (err) {
//             return callback(err);
//         }
//         var students = JSON.parse(data).students;
//         //要修改谁，就把谁找出来，es6有个数组的方法：find（函数），当遍历符合item.id=student.id的时候，find终止遍历，同时返回遍历项
//         var ret=students.find(function(item){
//             return item.id===id;
//         })
//         callback(null,ret);
//     })
// }
// //增加学生
// exports.save=function(student,callback){
//     fs.readFile(dbPath,'utf8',function(err,data ) {
//         if (err) {
//             return callback(err);
//         }
//         var students = JSON.parse(data).students;
//         student.id=students[students.length-1].id+1;
//         students.push(student);
//         //把对象数据转化为字符串
//         var fileData=JSON.stringify({
//             students:students
//         });
//         fs.writeFile(dbPath,fileData,function(err){
//             if(err){
//                 return callback(err)
//             }else{
//                 callback(null);
//             }
//         })
//     })
// };
//
// //更新学生
// exports.upDate=function(student,callback){
//     fs.readFile(dbPath,'utf8',function(err,data ) {
//         if (err) {
//             return callback(err);
//         }
//         var students = JSON.parse(data).students;
//         student.id=parseInt(student.id);
//         //要修改谁，就把谁找出来，es6有个数组的方法：find（函数），当遍历符合item.id=student.id的时候，find终止遍历，同时返回遍历项
//        var stu=students.find(function(item){
//         return item.id===student.id;
//         })
//         for(var key in student){
//            stu[key]=student[key];
//         }
//         var fileData=JSON.stringify({
//             students:students
//         });
//         fs.writeFile(dbPath,fileData,function(err){
//             if(err){
//                 return callback(err)
//             }else{
//                 callback(null);
//             }
//         })
//     })
// }
//
// //删除学生
// exports.delete=function(id,callback){
//     fs.readFile(dbPath,'utf8',function(err,data ) {
//         if (err) {
//             return callback(err);
//         }
//         var students = JSON.parse(data).students;
//        // findIndex(函数):es6 用来根据条件查找元素下标
//         var index=students.findIndex(function(item){
//             return item.id===id;
//         })
//         //将学生从数组中删除
//         students.splice(index,1);
//         //把对象数据转化为字符串
//         var fileData=JSON.stringify({
//             students:students
//         });
//         fs.writeFile(dbPath,fileData,function(err){
//             if(err){
//                 return callback(err)
//             }else{
//                 callback(null);
//             }
//         })
//     })
// };


// 改良版：利用mongodb数据库
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/itcast');
var Schema=mongoose.Schema;
var studentSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:Number,
        enum:[0,1],     //只能取到的值
        default:0,      //默认的值
    },
    age:{
        type:Number,
    },
    hobbies:{
        type:String
    }

});

//直接导出模型构造函数
module.exports=mongoose.model('Student',studentSchema);