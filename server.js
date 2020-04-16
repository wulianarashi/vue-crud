const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const passport = require('passport')
const bodyParser = require('body-parser')

const user = require('./router/user')
const staff = require('./router/staff')

const mongoUrl = require('./config/mongodb').mongoUrl

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    console.log('connect success')
}).catch( (err) => {
    console.log(err)
}) 

app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', user)
app.use('/api/staff', staff)

const port = process.env.PORT || 3000

app.listen( port, () => {
    console.log('running 3000')
})