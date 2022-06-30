const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석하도록 등록
app.use(bodyParser.json());

// DB lists 테이블에 있는 모든 데이터 응답
app.get('/api/values', (req, res) => {
    db.pool.query('select * from lists',
    (err, results, fileds) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(results);
        }
    })
});

app.post('/api/value', (req, res, next) => {
    db.pool.query(`insert into lists (value) values("${req.body.value}")`, 
    (err, results, fileds) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json({
                success: true,
                value: req.body.value
            });
        }
    })
});

app.listen(5000, (req, res) => {
    console.log("Server is running");
});

