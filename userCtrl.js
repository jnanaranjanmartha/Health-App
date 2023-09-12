const userModel  = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
    try{
        const existingUser =await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({message: "User Already Exist", success:false});
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({message: "Register Successfully", success:true});
    }catch(error){
        console.log(error)
        res.status(500).send({succes:false, message: "Register Controller ${error.message}"})
    }
};
const loginController = async (req, res)=> {
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({message: 'User not found', success:false});

        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({message:'Invalid Email or Password', success:false});
        }
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expireIn: '5d'});
        res.status(200).send({message:'Login Success', success:true, token:token});

    }catch(error){
        console.log(error)
        res.status(500).send({message: 'error in login Controller ${error.message}'});
    }
};

module.express = {loginController, registerController};