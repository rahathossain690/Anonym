
const express = require('express')
const api = require('./api')
const cookieParser = require("cookie-parser");
const cors = require('cors')
require('dotenv').config()
const app = express()

// CORS enablitiy
//app.use(cors()) // cors enabled for all origins

//to enable CORS for single origin uncomment this portion
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials : true,
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions)) 

app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Origin", "https://anonym-app.herokuapp.com");
    res.header("Access-Control-Allow-Credentials", true);
    req.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cookieParser());
app.use('/api', api); // api middleware: basically backend

app.get('/', (req, res) => {
    res.json({yes: "Working"})
})

app.listen(process.env.PORT || 4000, async () => {
    console.log('>> server initiated')
})
