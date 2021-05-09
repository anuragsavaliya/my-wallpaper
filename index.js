const http = require('http')
const express = require('express')
const mongoose = require('mongoose')


const app = express();
const port = process.env.PORT || 3000
const server = http.createServer(app);
server.listen(port);
console.log("connected " + port)

const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://Anurag:anurag@cluster0.pa0er.mongodb.net/wallpaperapp', {
  useNewUrlParser: true, useUnifiedTopology: true,
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const categoryRoute = require("./src/category/categoryroute");
app.use("/category", categoryRoute);

const photoRoute = require("./src/photos/photoroute");
app.use("/photo", photoRoute);

const userRoute = require("./src/user/userroute");
app.use("/user", userRoute);


const toggleLikeRoute = require("./src/like/toggleLikeRoute");
app.use("/toggleLike", toggleLikeRoute);


const PhotoCompRoute = require("./src/PhotoComp/PhotoCompRoute");
app.use("/photocomp", PhotoCompRoute);


const FrameRoute = require("./src/Frams/FrameRoute");
app.use("/frames", FrameRoute);


app.use((req, res, next) => {
  const error = new Error('Not Found');
  res.status(404)
  next(error)
})
