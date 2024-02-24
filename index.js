const express = require("express");
const app = express();
const port = 3000;
const {connection} = require("./sql_config")

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
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});