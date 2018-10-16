/**
 * app.js 入门模块
 * 职责：创建服务  做一些相关配置   模块引擎 body-parser解析表单post请求体  提供静态资源  监听端口启动服务 挂载路由
 * @type {*|createApplication}
 */
var express=require('express');
var router=require('./router');
var bodyParser=require('body-parser');

var app=express();

//公开指定目录 只要这样做了，就可以通过/public/xx的方式访问public目录中的所有资源了
app.use('/public',express.static('./public/'));
app.use('/node_modules/',express.static('./node_modules/'));

//配置使用art-template模块引擎
//第一个参数：当渲染以.art结尾的文件的时候，使用art-template模块引擎
//express-art-template是专门用来在express中把art-template整合到express中；
// 虽然art-template不需要require，但也得安装，因为express-art-tenplate依赖了art-template；
app.engine('html', require('express-art-template'));//art可以是文件的后缀名，可以随便取，但相应的模版文件后缀名也得改成一样的

//当以post请求的时候/post的时候，执行指定的处理函数,在express中没有内置获取表单post请求的api，需要第三方包body-parser
//1.安装body-parser包 2.引包（require("body-parser") 3.配置app.use(bodyParser.urlencoded({extended:false}))
//4.app.use(bodyParser.json()) 配置完成后，req对象会多一个body属性，通过req.body获取表单post请求体数据

// 配置body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// router(app);

//把路由容器挂载到app服务中
app.use(router);

app.listen(3000,function(){
    console.log('run');
});
