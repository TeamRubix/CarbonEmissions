const express = require('express');
const mongoose=require('mongoose');

const emissionSchema = new mongoose.Schema({
    foodName: {
        type: String
    },
    originPoint: {
        type: String
    },
    transportDistance: {
        type: String
    },
    weight: {
        type: String
    },
    unitsTotal: {
        type: String
    },
    valueTTW: {
        type: String
    },
    valueWTW: {
        type: String
    },
    valuePerkg: {
        type: String
    }

});

module.exports = mongoose.model('FoodEmission', emissionSchema);