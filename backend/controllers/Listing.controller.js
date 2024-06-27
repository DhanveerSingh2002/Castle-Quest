const { default: mongoose } = require("mongoose");
const Listing = require("../models/listing.model");
const { errorHandler } = require("../utils/error");


const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing)
    {
        return next(errorHandler(404, "Listing not found!"));
    }

    if(req.user.id!=listing.userRef)
    {
        return next(errorHandler(401, "You can only delete your own listings"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Listing deleted successfully!"});
    } catch (error) {
        next(error);
    }

}

const updateListing = async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) 
    {
        return next(errorHandler(404, "Listing not found!"));
    }

    const listing = await Listing.findById(req.params.id);

    if(!listing)
    {
        return next(errorHandler(404, "Listing not found!"));
    }       

    if(req.user.id!==listing.userRef)
    {
        return next(errorHandler(401, "You can only update your own listings"));
    }
    
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

module.exports = {createListing, deleteListing, updateListing};