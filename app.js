const { log, error } = require('console');
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');

const Product = require('./models/productModel');

// => middleware
app.use(express.json()) 

app.get('/', (req, res) =>{
 res.send('Hello World!')
})
app.get('/blog', (req, res) => {
  res.json({"message":"boring broo ssly"})
})

//get => request

app.get('/product',async(req,res)=>{
  try {
    const product=await Product.find({})
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
    
  }
})

// get => request by id of respective
app.get('/product/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const product=await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
    
  }
})




//update=>put or path 
app.put('/product/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body);
    if(!product){
      return res.status(404).json({message:`cannot find any product with the id ${id}`});
    }
     const updatedProduct=await Product.findById(id);
     res.status(200).json(updatedProduct);


  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
    
  }
})



//delete => request
//update=>put or path 
app.delete('/product/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id,req.body);
    if(!product){
      return res.status(404).json({message:`cannot find any product with the id ${id}`});
    }
     const updatedProduct=await Product.findById(id);
     res.status(200).json(updatedProduct);


  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
    
  }
})




//post request
app.post('/product',async(req,res)=>{
  try {
    const product=await Product.create(req.body)
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({message:error.message})
    
  }
})
mongoose.connect('mongodb+srv://sagardm97:46447171@cluster0.wrsjgch.mongodb.net/Node-api?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () =>{
      console.log("connect to mongoDB");
        console.log(`Example app listening on port ${port}!`)
       })
  
  console.log('Connected!')
}).catch((error)=>console.log(error))


