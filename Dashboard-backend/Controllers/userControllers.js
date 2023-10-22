const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const generateToken = require('../config/genrateToken');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
// const JWT_SECRET=process.env.JWT_SECRET;
const registerUser = asyncHandler(async (req,res)=>{
    const {name ,email,password,phone}= req.body;
    if(!name || !email || !password || !phone){
        return res.status(400).json({msg: "Please fill all required field"})
        // throw new Error( "Please fill all required field")
    }
    const userExist= await User.findOne({email})
    if(userExist){
        return res.status(401).json({msg:"User with this email already exist."});
        // throw new Error("User with this email already exist.")
    }
    const salt=await bcrypt.genSalt(10);
    const secpass=await bcrypt.hash(password,salt);

    const user = await User.create({
        name,
        email,
        password: secpass,
        phone,
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
        });
        
    }
    else{
        return res.status(401).json({msg: "failed to create user."})
    }
});

const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user= await User.findOne({email});
    const passwordCompare=await bcrypt.compare(password,user.password)
    if(user && passwordCompare){
         
            res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id)
            })
    }
    else{
        return res.status(401).json({msg:"Invalid credentials."})
    //    throw new Error("Invalid credentials.");
    }
});


  

module.exports={registerUser,authUser}