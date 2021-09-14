const express = require('express')  // express module을 가져옴
const app = express()  // 가져온 express 모듈을 이용하여 새로운 exoress 객체를 만듬.
const port = 5000;

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://orlando69:korea7254@studyingmongodb.hrgzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))




app.get('/', (req, res) => {
  res.send('Hello World! ~ 안녕하세요')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) // 포트 5000에서 이 화면을 띄우겠다.