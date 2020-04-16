const express = require('express')
const router = express.Router()
const Staff = require('../models/staff')
const passport = require('passport')

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const staff = {} 

    if (req.body.num) { staff.num = req.body.num }
    if (req.body.name) { staff.name = req.body.name }
    if (req.body.phone) { staff.phone = req.body.phone }
    if (req.body.card) { staff.card = req.body.card }
    if (req.body.email) { staff.email = req.body.email }
    if (req.body.entry) { staff.entry = req.body.entry }

    new Staff(staff).save().then( () => {
        res.json({
            code: 200,
            message: '添加成功'
        })
    }).catch( () => {
        res.json({
            code: 201,
            message: '请稍后重试',
        }) 
    })
})

router.post('/list', passport.authenticate('jwt', {session: false}), (req ,res) => {
    Staff.find().then( data => {
        if (!data) {
            return res.json({
                code: 200,
                message: '查无数据',
                data: []
            })
        }

        res.json({
            code: 200,
            message: '查询成功',
            data: data
        }) 
    }).catch( () => {
        res.json({
            code: 201,
            message: '请稍后重试',
        }) 
    })
})

router.post('/list/:id', passport.authenticate('jwt', {session: false}), (req ,res) => {
    Staff.findOne({ _id: req.params.id }).then( data => {
        if (!data) {
            return res.json({
                code: 200,
                message: '查无数据',
                data: null
            }) 
        }

        res.json({
            code: 200,
            message: '查询成功',
            data: data
        }) 
    }).catch( () => {
        res.json({
            code: 201,
            message: '请稍后重试',
        }) 
    })
})

router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const staff = {} 

    if (req.body.num) { staff.num = req.body.num }
    if (req.body.name) { staff.name = req.body.name }
    if (req.body.phone) { staff.phone = req.body.phone }
    if (req.body.card) { staff.card = req.body.card }
    if (req.body.email) { staff.email = req.body.email }
    if (req.body.entry) { staff.entry = req.body.entry }

    Staff.findByIdAndUpdate( {_id: req.params.id}, {$set :staff}, {new: true}).then( data => {
        res.json({
            code: 200,
            message: '编辑成功'
        })
    }).catch( () => {
        res.json({
            code: 201,
            message: '请稍后再试'
        })
    })
})

router.post('/del/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    Staff.findByIdAndRemove( {_id: req.params.id}).then( data => {
        // data.save().then( () => {
        //     res.json({
        //         code: 200,
        //         message: '删除成功'
        //     })
        //     
        // })
        res.json({
            code: 200,
            message: '删除成功'
        })
    }).catch( () => {
        res.json({
            code: 201,
            message: '请稍后再试'
        })
    })
})

module.exports = router
 