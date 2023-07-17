const express=require('express')
const connection = require('./connection/db')
const userrouter = require('./routes/user.router')
const quizrouter = require('./routes/quiz.router')
const cors=require('cors')

const app=express()

app.use(express.json())
app.use(cors())
app.use("/user",userrouter)
app.use("/quiz",quizrouter)


app.listen(4031,async ()=>{
    try {
        await connection
        console.log("connected")
    } catch (error) {
        
    }
    console.log("connected to server to 4031")
})