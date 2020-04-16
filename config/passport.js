const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('mongoose').model('User')
const { secretOrKey } = require('./mongodb')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey =secretOrKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then( user => {
            if (user) {
                return done(null, user)
            }else{
                return done(null, false)
            }
        }).catch( err => {
            throw err
        })
    }));
}