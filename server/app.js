var express = require("express");
var router = require("./router.js");
var bodyParser = require("body-parser");
var app = express();

app.use("/node_modules/",express.static("./node_modules"));
app.use("/public/",express.static("./public/"));

app.engine("html",require("express-art-template"));

// 配置 body-parser 中间件（插件，专门解析表单post请求数据）
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

// 把路由容器挂载到app服务中
app.use(router);

app.listen(3000,"0.0.0.0",function(){
    console.log("Server running...");
})
