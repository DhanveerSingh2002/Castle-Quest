const User = require("../models/User.model");
const bcryptjs = require('bcryptjs');

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

module.exports = {signUp,};