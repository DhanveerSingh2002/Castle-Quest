const User = require("../models/User.model");
const Listing = require("../models/listing.model");
const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");

const test = (req, res) => {
    res.json({
        message: "hello world",
        name: "Dhanna Don",
    })
}

const updateUserInfo = async (req, res, next) => {
    if(req.user.id !== req.params.id)
    {
        return next(errorHandler(401, "You are not authenticated, Please sign up first."));
    }
    try {
        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password:  req.body.password,
            avatar: req.body.avatar,
        },
    }, {new: true})

    const {password, ...rest} = updatedUser._doc;

    res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => 
{
    if(req.user.id !== req.params.id)
    {
        return next(errorHandler(401, "You can only delete your own account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User deleted successfully");
    } catch (error) {
        next(error);
    }
}

const getListings = async (req, res, next) => {
    if(req.user.id === req.params.id)
    {
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    }
    else
    {
        return next(errorHandler(401, "You do not have permission to access this"));
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
        {
            return next(errorHandler(404, "User not found!"));
        }

        const {password:pass,...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    test,
    updateUserInfo,
    deleteUser,
    getListings,
    getUser
}