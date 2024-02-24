const express = require("express");
const app = express();
const port = 3000;
const { connection } = require("./sql_config");
app.use(express.json());
app.get("/", function (req, res) {
  connection.connect();
  connection.query("select userid from user", (err, rows, fields) => {
    if (err) throw err;
    res.send({ userid: rows[0].userid });
  });
});
app.get("/getuser", function (req, res) {
  connection.connect();
  const query = "select * from user where userid = ?";
  connection.query(query, [req.query.userid], (err, rows, fields) => {
    if (err) throw err;
    res.send({ userid: rows[0] });
  });
});
app.post("/createuser", function (req, res) {
  // res.json({requestBody: req.body})
  connection.connect();
  const query =
    "insert into user(userid,pw,email,age,major,firstname,lastname,latitude,longitude) values(?,?,?,?,?,?,?,?,?)";
  console.log(req.body.userid);
  connection.query(
    query,
    [
      req.body.userid,
      req.body.pw,
      req.body.email,
      req.body.age,
      req.body.major,
      req.body.firstname,
      req.body.lastname,
      req.body.latitude,
      req.body.longitude,
    ],
    (err, rows, fields) => {
      if (err) throw err;
      res.send("success");
    }
  );
});
let users = [
  {
    userId:3, 
    socketId:'232312312',
    lat: 48,
    lng: -98.13,
  },
];

const http = require("http");
const server = http.createServer(app);

const CLIENT_APP = "http://localhost:5173";
server.listen(port, () => {
  console.log("Server is running on port ", +port);
});
const io = require("socket.io")(server, {
  cors: {
    origin: CLIENT_APP,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("userLogin", (user) => {
    const { userId, lat, lng } = user;
    // console.log(user)
    users.push({
      userId,
      lat,
      lng,
      socketId: socket.id,
    });
    // console.log(users)
    socket.emit("getUsers", users);
  });
  socket.on("sendInv", (payload) => {
    const { user, socketId, to } = payload;
    console.log(payload);
    io.to(to).emit("getInv", payload);
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u.socketId != socket.id);
    // console.log(users)
  });
});
