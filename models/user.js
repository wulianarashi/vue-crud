const mongoose = require('mongoose')
const Scheam = mongoose.Schema

const UserSchem = new Scheam({
    name: {
        type:String,
        require:true
    },
    company: {
        type:String,
        require:true
    },
    phone: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    time: {
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchem)