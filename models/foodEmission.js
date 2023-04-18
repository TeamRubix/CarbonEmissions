const express = require('express');
const mongoose=require('mongoose');

const emissionSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: 'This is required'
    },
    originPoint: {
        type: String,
        required: ' This is required'
    },
    transportDistance: {
        type: Number
    },
    weight: {
        type: Number
    },
    unitsTotal: {
        type: Number
    },
    valueTTW: {
        type: Number
    },
    valueWTW: {
        type: Number
    },
    valuePerkg: {
        type: Number
    }

});

module.exports = mongoose.model('FoodEmission', emissionSchema);




