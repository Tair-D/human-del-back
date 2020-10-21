const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    phoneNumber: {
        unique: true,
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    terms: {
        type: Boolean,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    localAddress: {
        type: String,
        required: false
    },
    passportNumber: {
        type: Number,
        required: false
    },
    passportID: {
        type: Number,
        required: false
    },
    accountCreated: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: Array,
        required: false
    },
    ranking: {
        one: {
            type: Number,
            default: 0,
            counted: {
                type: Number,
                default: 0
            }
        },
        two: {
            type: Number,
            default: 0,
            counted: {
                type: Number,
                default: 0
            }
        },
        three: {
            type: Number,
            default: 0,
            counted: {
                type: Number,
                default: 0
            }
        },
        four: {
            type: Number,
            default: 0,
            counted: {
                type: Number,
                default: 0
            }
        },
        five: {
            type: Number,
            default: 0,
            counted: {
                type: Number,
                default: 0
            }
        }
    },
    isCompanion: {
        type: Boolean,
        default: false
    },
    isClient: {
        type: Boolean,
        default: true
    },
    cardInfo: {
        cardNumber: {
            type: String,
            required: false,
            unique: true
        },
        cardUsername: {
            type:  String,
            required: false,
            unique: true
        },
        cardValidDate: {
            type: Date
        },
        cardCVV: {
            type: Number,
            unique: true
        }
    },
    balans: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User