const mongoose = require('mongoose')
const Scheam = mongoose.Schema

const StaffSchem = new Scheam({
    num: {
        type:String,
    },
    name: {
        type:String,
        require:true
    },
    phone: {
        type:String,
        require:true
    },
    card: {
        type:String,
    },
    email: {
        type:String,
    },
    entry: {
        type:Date,
        default: Date.now()
    },
    time: {
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Staff', StaffSchem)