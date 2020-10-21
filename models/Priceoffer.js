const mongoose = require('mongoose')

const priceofferSchema = new mongoose.Schema({
    companionID: String,
    clientID: String,
    clienttOrderID: String,
    companionOrderID: String,
    priceFromCompanion: Number,
    priceFromClient: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})