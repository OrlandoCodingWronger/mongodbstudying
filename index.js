const express = require('express')  // express module을 가져옴
const app = express()  // 가져온 express 모듈을 이용하여 새로운 exoress 객체를 만듬.
const port = 5000;

const config = require('./config/key')

// 몽고 DB 초기 설정
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))
// 몽고 DB 설정 끝.
const bodyParser = require('body-parser');
const { User } = require("./models/User"); 

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// application/json
app. use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World! ~ 안녕하세요 zzzkkk')
})

app.post('/register',(req, res) => {
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.

    const user = new User (req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) // 포트 5000에서 이 화면을 띄우겠다.

// git -> 
// 먼저 git --version으로 버전 확인
// 없으면 받고, 있으면 루트 폴더에서 터미널 접속되었는지 여부 확인 후, 
// git init 실행
// 깃의 상태를 확인하고 싶으면, git status