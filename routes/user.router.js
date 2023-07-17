const express = require('express')
const UserModel = require('../models/user.model')

const userrouter = express.Router()


userrouter.post("/register", async (req, res) => {
    try {
        const { username, email } = req.body
        const isUserPresent = await UserModel.findOne({ email })
        if (isUserPresent) {
            return res.status(201).send({ msg: "Already a user", isUserPresent })
        }
        const newUSer = new UserModel({ username, email })
        await newUSer.save()
        return res.status(200).send({ msg: "Registration Succesful", newUSer })
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})

module.exports=userrouter