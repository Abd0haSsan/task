//         => show data, login, register
const express = require('express')
const patient = require('../models/patient')
const router = new express.Router()
//patient register

router.post('/patientRegister',async(req,res)=>{
    const data = new patient(req.body)
    try{
        await data.save()
        res.status(200).send({
            status:1,
            data : data,
            msg:'done'
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            user:e,
            msg:'error'
        })
    }
})
//patient data
router.get('/patient/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const user = await patient.findById(_id)
        if (!user){
            res.status(200).send({
                status:1,
                data:'',
                msg:'user not found'
            })
        }
        res.status(200).send({
            status:1,
            data:user,
            msg:'user data retreived'
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'error loading user data'
        })
    }
})
//patient login

router.post('/patientlogin', async(req,res)=>{
    try{
        const user = await patient.findByCredentials(req.body.email, req.body.pass)
        res.send({
            status:1,
            data:user,
            msg:"logged in"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:"err in data"
        })
    }
})
module.exports = router