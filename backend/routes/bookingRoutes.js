const express = require("express");

const router = express.Router();

const Booking = require("../models/Booking");


// Create booking
router.post("/", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        const savedBooking = await booking.save();

        res.status(201).json({
            message: "Booking successful",
            booking: savedBooking
        });

    } catch (error) {

        res.status(500).json({
            message: "Booking failed"
        });

    }

});


// Get all bookings
router.get("/", async (req, res) => {

    try {

        const bookings = await Booking.find().sort({
            createdAt: -1
        });

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching bookings"
        });

    }

});


// Get one booking
router.get("/:id", async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({
                message: "Booking not found"
            });

        }

        res.json(booking);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching booking"
        });

    }

});


// Delete booking
router.delete("/:id", async (req, res) => {

    try {

        await Booking.findByIdAndDelete(req.params.id);

        res.json({
            message: "Booking cancelled successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error cancelling booking"
        });

    }

});


module.exports = router;