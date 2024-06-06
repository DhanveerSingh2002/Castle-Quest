const User = require("../models/User.model")

const signUp = async (req, res) => 
{
    const {username, email, password} = req.body;
    const newUser = new User({username, email, password});
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {signUp,};