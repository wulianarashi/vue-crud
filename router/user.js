const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { secretOrKey } = require('../config/mongodb')

router.get('/test', (req, res) => {
    res.json({
        msg: 'test'
    })
})

router.post("/register", (req, res) => {
    User.findOne({
        phone: req.body.phone
    }).then( data => {
        if (data) {
            return res.status(400).json({
                message: '该手机已注册,请登录'
            })
        }else {
            const newUser = new User({
                name:req.body.name,
                company:req.body.company,
                password:req.body.password,
                phone:req.body.phone,
            }) 

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                      throw err
                    }
                    newUser.password = hash
                    newUser.save().then( data => {
                        return res.status(200).json({
                            code: 200,
                            message: '注册成功'
                        })
                    }).catch( err => {
                        return res.status(500).json({
                            code: 500,
                            message: '注册失败'
                        })
                    })
                });
            });
        }
    })
})

router.post('/login', (req, res) => {
    const phone = req.body.phone
    const password = req.body.password

    User.findOne({ phone }).then( result => {
        if (!result) {
            return res.status(200).json({
                code: 201,
                message: '该手机号未注册'
            })
        }

        bcrypt.compare(password, result.password).then( match => {
            if (match) {
                const rule = {
                    id: result.id,
                    name: result.name,
                    company: result.company
                }

                jwt.sign(rule, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        code:200,
                        message: '登录成功',
                        token:"Bearer " + token
                    })
                })
            }else{
                return res.json({
                    code: 201,
                    message: '账号或密码错误'
                })
            }
        })
    })
})

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        phone:req.user.phone,
        company: req.user.company
    })
})

module.exports = router