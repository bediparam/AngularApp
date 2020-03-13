const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post =  require('./models/post');

mongoose.connect('mongodb://localhost:27017/myApp')
  .then(()=>{
    console.log("Connected To MongoDB");
  }).catch(()=>{
    console.log('Connection To MongoDB Failed');
  }
);

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');
  next();
});

app.post('/api/posts',(req, res, next)=>{
  const post = new Post({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    city: req.body.city,
    state : req.body.state,
    address : req.body.address,
    postCode : req.body.postCode
  });

  post.save();
  res.status(201).json({
    message: "post added successfully"
  });


});

app.get('/api/posts',(req, res, next)=>{
  Post.find().then(documents => {
    res.status(200).json({
      posts:documents,
      message:"post send successfully"
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) =>{
  Post.deleteOne({_id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({message:"Post deleted successfully"});
  })


})


module.exports = app;
