const User = require("../models/User.model");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/error");
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => 
{
    const {username, email, password} = req.body;
    if (!password || password.length === 0) {
        return res.status(400).json({ error: "Password is required and cannot be empty." });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email : email});
        if(!validUser)
        {
            return next(errorHandler(404, "User not found!"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword)
        {
            return next(errorHandler(401, "Username or Password is incorrect!"));
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

const googleSignIn = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user)
        {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password:pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase(), email: req.body.email, password: hashedPassword, avatar: req.body.photo}); 
            await newUser.save();
            res.status(201).json(newUser);
            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
            const {password:pass, ...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {signUp, signIn, googleSignIn};