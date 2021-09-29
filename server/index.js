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
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require("./models/User"); 

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// application/json
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World! ~ 안녕하세요 zzzkkk'))

app.get('/api/hello',(req, res)=>{
  res.send("안녕하세요 ~ ")
})

app.post('/api/users/register',(req, res) => {
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

app.post('/api/users/login',(req,res)=> {

 //요청된 이메일을 데이터베이스에서 있는지 찾는다.
 User.findOne({ email: req.body.email },(err, user)=>{
   if(!user){
     return res.json({
       loginSuccess: false,
       message: "제공된 이메일에 해당하는 유저가 없습니다."
     })
   }
   // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
   user.comparePassword(req.body.password , (err, isMatch)=> {
     if(!isMatch)
      return res.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다."})
     // 비밀번호 까지 맞다면, 토큰을 생성하기.
     user.generateToken((err,user)=>{
      if(err) return res.status(400).send(err);

      // 토큰을 저장한다. 어디에? 쿠키?, 로컬스토리지? 
      res.cookie("x_auth",user.token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id })

     })
   })
 })
})
// 한 군데에 모아 놓게 되면 페이지가 굉장히 길어지기 때문에, Express에서 제공되는 Router를 이용하여 정리할 것이다.
// 엔드포인트에서 리퀘스트를 받은 후, 콜백펑션 시행 전 중간에서 무언가 해주는게 미들웨어.
app.get('/api/users/auth', auth ,(req,res)=>{
  // 인증 실패시, 미드웨어에서 다른 곳으로 빠져나가게 됨. 여기까지 도달했다는 것은 인증에 성공했다는 이야기임.
  // 즉 Authentication이 True라는 말임.
  res.status(200).json({
    _id: req.user._id,
    // 만약 role이 1인 유저가 admin이고 2인 유저가 특정 부서의 admin이라면, ... 바꿔줄 순 있다.
    // role이 0이면 일반유저, role이 0이 아니면 관리자. (지금 현재.)
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id: req.user._id},
    { token : ""},
    (err,user)=>{
      if(err) return res.json({success: false, err});
      return res.status(200).send({
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

