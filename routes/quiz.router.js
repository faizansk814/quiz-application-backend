const express = require('express')
const QuizModel = require('../models/quiz.model')

const quizrouter = express.Router()

quizrouter.post("/post", async (req, res) => {
    try {
        const { creator, title, description, questions, leaderboard } = req.body
        const newQuiz = new QuizModel({ creator, title, description, questions, leaderboard: [] })
        await newQuiz.save()
        return res.status(200).send({ msg: "New Quiz Created" })
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})
quizrouter.get("/particular", async (req, res) => {
    try {
        const quizId = req.query.id
        const quizdata = await QuizModel.findById(quizId)
        return res.status(200).send(quizdata)
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})

quizrouter.delete("/delete/:id/:email", async (req, res) => {
    try {
        const { id, email } = req.params
        const user = await QuizModel.findOne({ _id: id })
        console.log(user)
        console.log(email)
        if (user.creator != email) {
            return res.status(400).send({ msg: "You are not authorized" })
        }
        const deletequiz = await QuizModel.findByIdAndDelete({ _id: id })
        return res.status(200).send({ msg: "Quiz Deleted" })
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})


quizrouter.get("/get", async (req, res) => {
    try {
        const allquiz = await QuizModel.find()
        return res.status(200).send(allquiz)
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})

module.exports = quizrouter


