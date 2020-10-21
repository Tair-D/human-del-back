const mongoose = require('mongoose')

let connectionSchema = new mongoose.Schema({
    clientID: String,
    companionID: String,
    from: String,
    to: String,
    date: Date,
    price: String,
    typePackage: String,
    typeTransport: String,
    paymentStatus: String,
    deliveryStatus: String
})

