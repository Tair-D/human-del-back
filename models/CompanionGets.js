const mongoose = require('mongoose')

const companionGetsSchema = new mongoose.Schema({
    companionID: String,
    clientID: String,
    clientOrderID: String,
    clientOrderCreatedAt: Date,
    clientOrderFrom: String,
    clientOrderTo: String,
    clientOrderDate: Date,
    clientOrderPrice: Number,
    clientOrderTypePackage: String,
    clientOrderTypeTransport: String,
    clientAcceptedStatus: String,
    clientAcceptedDate: Date,
    clientPaymentStatus: String,
    companionDeliveryStatus: String,
    companionGetMoneyStatus: String,
    companionAddedThisClientOrderDate: {
        type: Date,
        default: Date.now
    }
})

const CompanionGets = mongoose.model('CompanionGets', companionGetsSchema)

module.exports = CompanionGets