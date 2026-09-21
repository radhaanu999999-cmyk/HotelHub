const express = require("express");

const router = express.Router();

const Hotel = require("../models/hotel");


// Get all hotels
router.get("/", async (req, res) => {

    try {

        const hotels = await Hotel.find();

        res.json(hotels);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching hotels"
        });

    }

});


// Add hotel
router.post("/", async (req, res) => {

    try {

        const hotel = new Hotel(req.body);

        const savedHotel = await hotel.save();

        res.status(201).json(savedHotel);

    } catch (error) {

        res.status(500).json({
            message: "Error adding hotel"
        });

    }

});


module.exports = router;