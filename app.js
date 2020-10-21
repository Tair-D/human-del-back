const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Server Engine
const app = express()

// DB Engine
const dbconfig = require('./config/dbconfig');
mongoose.Promise = global.Promise
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Mlab connected")
}).catch((err) => {
    console.log("Mlab could not be connected: " + err)
})

// Setup MiddleWare
if(process.env.NODE !== 'production'){
    app.use(cors())
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use((req, res, next) => {
//     console.log('request', req.url, req.body, req.method);
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
//     next()
// });

// Require Models
const User = require('./models/User')
const Client = require('./models/Client')
const Companion = require('./models/Companion')

// @route home
app.get('/', (req, res) => {
    res.json({
        msg: "Hello World"
    })
})

// POST ::REGISTR
app.post('/api/registr', (req, res) => {
    const newUser = new User({
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 10),
        terms: req.body.terms
    })
    newUser.save(err => {
        if(err){
            return res.status(400).json({
                title: "User already exists :(",
                error: 'Choose your own phone number!'
            })
        }
        return res.status(200).json({
            title: "You're registred"
        })
    }) 
})

// POST ::LOGIN
app.post('/api/login', async (req, res) => {
    await User.findOne({phoneNumber: req.body.phoneNumber}, (err, user) => {
        if(err){
            return res.status(500).json({
                title: 'Server error',
                err
            })
        }
        if(!user){
            return res.status(401).json({
                title: 'User not found',
                errror: 'Invalid credentials'
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login failed',
                error: 'Invalid credentials'
            })
        }
        // If all Good
        let token = jwt.sign({ userID: user._id }, 'secretki')
        let user_id = user._id
        let userIsCompanion = user.isCompanion
        let userIsClient = user.isClient
        return res.status(200).json({
            title: 'Login is successfully',
            token,
            user_id,
            userIsCompanion,
            userIsClient
        })
    })
})

// GET ::USER DATA
app.get('/api/userData', (req, res) => {
    let token = req.headers.token
    jwt.verify(token, 'secretki', (err, decoded) => {
        if (err)
            return res.status(401).json({
                msg: "Unauthed user"
            })
        // IF TOKEN VALID
         User.findOne({_id: decoded.userID}, (err, user) => {
            if(err) return console.log(err);
            return res.status(200).json({
                title: "User is here",
                user
            })
        })
    })
})


// POST HOMESEARCH
app.post('/api/homeSearch', async (req, res) => {
    const searchClient = new Client({
        clientID: req.headers.userid,
        transport: req.body.transport,
        from: req.body.from,
        to: req.body.to,
        typePackage: req.body.packageType,
        date: req.body.date,
        price: req.body.price
    })
    console.log(searchClient)
    await searchClient.save((err) => {
        if(err) return console.log(err);
        return res.status(200).json({
            title: 'New search is saved'
        })
    })
})

app.get('/show-companions', async (req, res) => {
    // const searchCompanions = {
    //     from: req.headers.search.from,
    //     to: req.headers.search.to,
    //     date: req.headers.search.date,
    //     price: req.headers.search.price,
    //     typePackage: req.headers.search.packageType,
    //     typeTransport: req.headers.search.transport
    // }
    console.log(req.params.from)
    // await Companion.find(searchCompanions, (err, companios) => {
    //     if(err){
    //         return res.status(404).json({
    //             title: 'Попутчик не найден!'
    //         })
    //     }

    //     return res.status(200).json({
    //         title: 'Все что нашел!',
    //         companions
    //     })
    // })
})

// ROUTES FOR COMPANION
app.post('/api/becomeCompanion', async (req, res) => {
    const cc = {
        isCompanion: req.body.isCompanion,
        isClient: req.body.isClient
    }
    let query = {_id: req.headers.userid}

    await User.updateOne(query, cc, (err) => {
        if(err) return console.log(err);
        return res.status(200).json({
            msg: 'User data updated successfully'
        })
    })
})

app.post('/api/becomeClient', async (req, res) => {
    const cc = {
        isCompanion: req.body.isCompanion,
        isClient: req.body.isClient
    }
    let query = {_id: req.headers.userid}

    await User.updateOne(query, cc, (err) => {
        if(err) return console.log(err);
        return res.status(200).json({
            msg: 'User data updated to client'
        })
    })
})


// ROUTES FOR COMPANION
app.get('/api/companionHome/orders', async (req, res) => {
    Client.find({}, (err, clients) => {
        if(err){
            return res.status(500).json({
                msg: "Server error"
            })
        } 
        return res.status(200).json({
            msg: "Orders is here",
            clients
        })
    })
})
// ROUTES FOR COMPANION ADS
app.get('/api/companionHome/myads', async (req, res) => {
    await Companion.find({companionID: req.headers.userid}, (err, companions) => {
        if(err){
            return console.log(err)
        } else {
            return res.status(200).json({
                msg: 'Your ads is here',
                companions
            })
        }
    })
})

app.post('/api/companion-new-order', async (req, res) => {
    const newCompanionAds = new Companion({
        companionID: req.headers.userid,
        from: req.body.from,
        to: req.body.to,
        date: req.body.date,
        typePackage: req.body.typePackage,
        price: req.body.price,
        typeTransport: req.body.typeTransport
    })

    console.log(newCompanionAds)
    await newCompanionAds.save(err => {
        if(err) return console.log(err)

        return res.status(200).json({
            msg: "Saved your new ads"
        })
    })
})


// ROUTES FOR CLIENT /HISTORY
app.get('/api/history', async (req, res) => {
    await Client.find({clientID: req.headers.userid}, null, {sort: {createdAt: -1}},(err, clients) => {
        if(err) return res.status(404).json({
            msg: 'Not founded'
        })

        return res.status(200).json({
            msg: "Your orders is here",
            clients
        })
    })
})

// PORT ENGINE
const PORT = process.env.PORT || 80
// SERVER RUNNED
app.listen(PORT, () => {console.log(`Server runned on ${PORT}`)})