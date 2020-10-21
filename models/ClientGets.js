const mongoose = require('mongoose');

let clientGetsSchema = new mongoose.Schema({
    clientID: String,
    companionID: String,
    
})

const ClientGets = mongoose.model('ClientGets', clientGetsSchema)

module.exports = ClientGets