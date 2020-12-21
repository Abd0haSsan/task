// paitent => name, username, pass, history, doctor id
//         => show data, login, register

const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const doctor = require('./doctor')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        minLength:10,
        maxLength:50
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('invalid email')
        }
    },
    pass:{
        type:String,
        minLength:6,
        maxLength:100,
        trim:true ,
        },
    status:{
        type: Boolean, default: true
    },
    history:{
        type:String
    }
})

UserSchema.virtual('doctor',{
    ref:'doctor', localField:'_id', foreignField:'patient'
})
UserSchema.methods.toJSON=function(){
    const user = this
    const userOBJ = user.toObject()
    delete userOBJ.pass
    return userOBJ
}
UserSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('pass'))
        user.pass = await bcrypt.hash(user.pass, 12)
    next()
})
UserSchema.statics.findByCredentials = async function(email, pass){
    const user= await User.findOne({ email })
    if(!user) throw new Error('unauthorized')
    const matched = await bcrypt.compare(pass, user.pass)
    if(!matched) throw new Error('unauthorized')
    if(!user.status)throw new Error('blocked')
    return user    
}
const User = mongoose.model('User', UserSchema)
module.exports = User