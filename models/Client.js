const mongoose = require('mongoose')

let clientSchema = new mongoose.Schema({
   clientID: {
       type: String,
       required: false
   },
   phoneNumber: {
        type: String
   },
   fullName: {
       type: String
   },
    typeTransport: {
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
        isField: {
            text: {
                type: String,
                default: 'Объявление подана'
            },
            status: {
                type: Boolean,
                default: true
            }
        },
        isAccepted: {
            text: {
                type: String,
                default: 'Заявка не принято попутчиком'
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        isPackageSent: {
            text: {
                type: String,
                default: 'Посылка не передана'
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        isDone: {
            text: {
                type: String,
                default: 'Посылка еще не доставлена попутчиком'
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        isPaidApplication: {
            text: {
                type: String,
                default: 'За объявление еще не оплатил'
            },
            status: {
                type: Boolean,
                default: false
            }
        },
        isPaidDelivery: {
            text: {
                type: String,
                default: 'За доставку еще не оплатил'
            },
            status: {
                type: Boolean,
                default: false
            }
        }
   },
   counterOfApplicationsFromCompanions: [
        {
            companionid: String,
            orderid: String,
            text: String
        }
    ],
    counterOfApplicationsFromClients: [
        {
            companionid: String,
            orderid: String,
            text: String
        }
    ],
   companion: {
       id: String,
       phoneNumber: String,
       fullName: String,
       deliveryStatus: {
           isResponded: {
               text: {
                type: String,
                default: 'Заявка не принята попутчиком',
               },
               status: {
                   type: Boolean,
                   default: false
               }
           },
           isAdopted: {
               text: {
                   type: String,
                   default: 'Посылка еще не принято попутчиком'
               },
               status: {
                   type: Boolean,
                   default: false
               }  
           },
           isDelivered: {
               text: {
                   type: String,
                   default: 'Посылка еще не доставлена'
               },
               status: {
                   type: Boolean,
                   default: false
               }
           },
           isThirdPersonGot: {
               text: {
                   type: String,
                   default: 'Посылка еще не получена 3-ем лицом'
               },
               status: {
                   type: Boolean,
                   default: false
               }
           }

       }
   },
    paymentStatus: {
       text: String,
       status: Boolean
   }

})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client