var fs=require('fs');
//初始版
// module.exports=function(app){
//     app.get('/student',function(req,res){
//         //readFile的第二个参数是可选的，转入utf8就是告诉它把读取到的文件直接按照utf8编码转成我们认识的字符,结果是字符串类型的
//         //也可以用data.tostring();
//         fs.readFile('./db.json','utf8',function(err,data){
//             if(err){
//                 return  res.status(500).send('fail');
//             }else{
//                 res.render('index.html',{
//                     students:JSON.parse(data).students
//                 });
//             }
//
//         })
//     });
// };

//改良版 express提供了一种更好的方式，专门用来包装路由的
//1.创建一个路由容器 2.把路由都挂载到router路由容器中 3.导出router  4.把路由容器挂载到入门模块中（app.js） app.use(router)
var express=require('express');

var student=require('./student.js');

//创建一个路由容器
var router=express.Router();

//把路由都挂载到router路由容器中
router.get('/student',function(req,res){
    //readFile的第二个参数是可选的，转入utf8就是告诉它把读取到的文件直接按照utf8编码转成我们认识的字符,结果是字符串类型的
    //也可以用data.tostring();
  student.find(function(err,students){
      if(err){
          return res.status(500).send('fail')
      }else{
          res.render('index.html',{
              students:students
          })
      }
  })
});

router.get('/student/new',function(req,res){
            res.render('new.html');
});

//student.js初始版
// router.post('/student/new',function(req,res){
//    student.save(req.body,function(err){
//        if(err){
//            return res.status(500).send('Server error');
//        }
//        res.redirect('/student');   //重定向
//    })
// });
// student.js改良版
router.post('/student/new',function(req,res){
    new student(req.body).save(function(err){
            if(err){
                return res.status(500).send('Server error');
            }
            res.redirect('/student');   //重定向
        })
});

//student.js初始版
// router.get('/student/edit',function(req,res){
//     student.findId(parseInt(req.query.id),function(err,student){  //req.query.id 的结果为字符串
//         if(err){
//             return res.status(500).send('fail')
//         }else{
//             res.render('edit.html',{
//                 student:student
//             })
//         }
//     })
// });

// student.js改良版
router.get('/student/edit',function(req,res){
    student.findById(req.query.id.replace(/"/g,""),function(err,student){
        if(err){
            return res.status(500).send('Server error');
        }else{
            res.render('edit.html', {
                student: student
            })
        }
    })
});

//student.js初始版
// router.post('/student/edit',function(req,res){
//     student.upDate(req.body.id,function(err){
//         if(err){
//             return res.status(500).send('Server error');
//         }
//         res.redirect('/student');   //重定向
//     })
// });

// student.js改良版
router.post('/student/edit',function(req,res){
    student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body,function(err){
        if(err){
            return res.status(500).send('Server error');
        }
        res.redirect('/student');   //重定向
    })
});


//student.js初始版
// router.get('/student/delete',function(req,res){
//     student.delete(parseInt(req.query.id),function(err){
//         if(err){
//             return res.status(500).send('Server error');
//         }
//         res.redirect('/student');   //重定向
//     })
// })

// student.js改良版
router.get('/student/delete',function(req,res){
    student.findByIdAndRemove(req.query.id.replace(/"/g,''),function(err){
        if(err){
            return res.status(500).send('Server error');
        }
        res.redirect('/student');   //重定向
    })
});
//3.导出router
module.exports=router;

