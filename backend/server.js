const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

const app = express();

app.use(bodyParser.json());

// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields) => {
//     console.log('results', results)
// })


// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보내줍니다.
app.get('/api/values', function(req, res) {
    db.pool.query('SELECT * FROM lists', (err, results, fields) => {
        if (err) {
            return res.status(500).send()
        } else {
            return res.json(results)
        }
    })
})

// 클라이언트에서 입력한 값을 DB lists 테이블에 넣어줍니다.
app.post('/api/value', function(req, res, next) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fields) => {
            if (err) {
                return res.status(500).send(err)
            } else {
                return res.json({
                    success: true, 
                    value: req.body.value
                })
            }
        })
})

app.listen(5000, () => {
    console.log('애플리케이션이 5000번 포트에서 시작되었습니다.')
})


