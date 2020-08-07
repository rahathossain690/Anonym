
const app = require('express')()
const dotenv = require('dotenv').config() // doesnt need to be cached. did for mental satisfation
const api = require('./api')
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use('/api', api); // api middleware: basically backend

app.listen(process.env.PORT || 5000, async () => {
    console.log('>> server initiated')
})