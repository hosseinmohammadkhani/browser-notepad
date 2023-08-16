const express = require('express');
const app = express()
const connectDB = require('./configs/database.js')
const path = require('path');

//connectDB()

// parses requests 
app.use(express.urlencoded({ extended : false }))

app.use(express.static(path.join(__dirname , "public")))

// app.use(require('express-ejs-layouts'))
app.set("views" , "views")
app.set("view engine" , "ejs")

app.use("/" , require('./routes/Home.js'))


app.listen(3000 , () => console.log("Server connected"))
