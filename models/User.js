const mongoose = require('mongoose');

// Schema 생성.
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50,
    },
    email:{
        type: String,
        trim: true,  // 공백 지우기
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }