const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        hotelName: {
            type: String,
            required: true
        },

        checkIn: {
            type: String,
            required: true
        },

        checkOut: {
            type: String,
            required: true
        },

        guests: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);