const mongoose = require('mongoose')

let companionSchema = new mongoose.Schema({
    companionID: {
        type: String
    },
    from: {
        type: String,
        required: false
    },
    to: {
        type: String
    },
    date: {
        type: Date
    },
    typePackage: {
        type: String
    },
    price: {
        type: String
    },
    typeTransport: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    applicationStatus: {
        type: String
    }
})

const Companion = mongoose.model('Companion', companionSchema)
module.exports = Companion