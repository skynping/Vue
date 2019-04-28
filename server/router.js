var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/vue",{ useNewUrlParser: true });

var User = mongoose.model("User",new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }
}))

router.get("/users",function(req,res){
    res.render("list-users.html");
})

router.post("/users",function(req,res){
    User.find((err,ret)=>{
        if(err){
            return res.status(500).send("Find error");
        }
        res.json({"users":ret});
    })
})

router.post("/add",function(req,res){
    var users = req.body;
    var user = new User(users);
    user.date = new Date();
    user.save(function(err,ret){
        if(err){
            return res.json({"success":1});
        }
        res.json({"success":0});
    })
})

router.post("/delete",function(req,res){
    var id = req.body.id;
    User.findByIdAndDelete(id,function(err,ret){
        if(err){
            return res.json({"success":1});
        }
        res.json({"success":0});
    })
})

module.exports = router;