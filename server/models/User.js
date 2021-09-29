const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;    // salt를 이용하여 비밀번호를 암호화 해야 함. salt를 생성하는게 먼저임! saltRounds는 salt가 몇 글자인지!
const jwt = require('jsonwebtoken');

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

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){    
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword 1234567    암호화된 비밀번호 $2b$10$BdIcwnUM.DineZG10uCJluyxM9WpFI6j4fp3fpMQYK6VQWIMmBajq   암호화된 비밀번호를
    // 복호화 할 수는 없기 때문에, 플레인패스워드를 암호화 하여 매치 시켜야 한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
            cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    
    var user = this;
    
    // jsonwebtoken을 이용하여 token을 생성하기.

    var token = jwt.sign(user._id.toHexString(),'secretToken')

    // user._id + 'secretToken' = token
    // 디코드시 'secretToken' -> user._id

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err)
            cb(null,user)
        })

    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }