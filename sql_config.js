const mysql = require('mysql2')
const {db_pw} = require('./sql_config.json')
const connection = mysql.createConnection({
    host: 'devclubhackathon2024.cuxlg5g3vklj.us-east-1.rds.amazonaws.com',
    user: 'admin',
    port: 3306,
    password: '12345678',
    database: '2024devclubhackathon'
})
module.exports = {
    connection
}