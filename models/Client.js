const mongoose = require('mongoose')

let clientSchema = new mongoose.Schema({
   clientID: {
       type: String,
       required: false
   },
   transport: {
       type: String,
       required: false
   },
   from: {
       type: String,
       required: false
   },
   to: {
       type: String,
       required: false
   },
   typePackage: {
       type: String,
       required: false
   },
   date: {
       type: Date,
       required: false
   },
   price: {
       type: Number,
       required: false
   },
   createdAt: {
       type: Date,
       default: Date.now
   },
   applicationStatus: {
       type: String
   }
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client