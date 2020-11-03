const mongoose = require('mongoose')

let companionSchema = new mongoose.Schema({
    companionID: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    fullName: {
        type: String
    },
    from: {
        type: String
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
        isField: {
            text: {
                type: String,
                default: 'Объявление подана'
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        isAcceptedApp: {
            text: {
                type: String,
                default: 'Заявления(и) не принята(ы) клиентом(ами)'
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        isAcceptedOrder: {
            text: {
                type: String,
                default: 'Посылка(и) не получена(ы) еще'
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        isDone: {
            text: {
                type: String,
                default: 'Посылка(и) не доставлена(ы) еще'
            },
            status: {
                type: Boolean,
                default: false
            }
        }
    },
    counterOfApplicationsFromClients: [
        {
            clientid: String,
            orderid: String,
            text: String
        } 
    ],
    counterOfApplicationsFromCompanions: [
        {
            clientid: String,
            orderid: String,
            text: String
        }
    ],
    client: [
        {
            id: String,
            phoneNumber: String,
            fullName: String,
            deliveryStatus: {
                isAdopted: {
                    text: {
                        type: String,
                        default: 'Заявка не принята клиентом'
                    },
                    status: {
                        type: Boolean,
                        default: false
                    }
                },
                isAccepted: {
                    text: {
                        type: String,
                        default: 'Посылку не получил от клиента'
                    },
                    status: {
                        type: Boolean,
                        default: false
                    }
                },
                isDone: {
                    text: {
                        type: String,
                        default: 'Посылку еще не доставил'
                    },
                    status: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        }
    ],
    paymentStatus: {
        fromHD: {
            type: String,
            default: 'Не оплачено за доставку'
        },
        myPayment: {
            type: String,
            default: 'Не оплатил за размещение объявлений'
        },
        status: {
            type: Boolean,
            default: false
        }
    }
})

const Companion = mongoose.model('Companion', companionSchema)
module.exports = Companion