const User = require("../models/User.model");

const signUp = async (req, res, next) => 
{
    const {username, email, password} = req.body;
    const newUser = new User({username, email, password});
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
}

module.exports = {signUp,};