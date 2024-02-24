const express = require("express");
const app = express();
const port = 3000;
const {connection} = require("./sql_config")
app.use(express.json())
app.get("/", function (req, res) {
  connection.connect()
  connection.query('select userid from user', (err, rows, fields) => {
    if (err) throw err
    res.send({"userid":rows[0].userid})
  })
});
app.get("/getuser", function (req,res){
  connection.connect()
  const query = 'select * from user where userid = ?'
  connection.query(query, [req.query.userid],(err, rows, fields) => {
    if (err) throw err
    res.send({"userid":rows[0]})
  })
})
app.post("/createuser", function (req,res){
  // res.json({requestBody: req.body})
  connection.connect()
  const query = 'insert into user(userid,pw,email,age,major,firstname,lastname,latitude,longitude) values(?,?,?,?,?,?,?,?,?)'
  console.log(req.body.userid)
  connection.query(query, [req.body.userid, req.body.pw, req.body.email, req.body.age, req.body.major, req.body.firstname, req.body.lastname,req.body.latitude,req.body.longitude],(err, rows, fields) => {
    if (err) throw err
    res.send("success")
  })
})
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});