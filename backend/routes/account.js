const express = require('express')
const { Account } = require('../db')
const { authMiddleware } = require('../middlewares/middleware')
const { default: mongoose } = require('mongoose')
const accountRouter = express.Router()

accountRouter.get('/balance', authMiddleware ,async (req, res) => {
    const balance = await Account.findOne({ userId: req.userId })
    res.status(200).json({ balance: balance.balance.toFixed(2) })
})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const { to, amount } = req.body
    const session = await mongoose.startSession()

    session.startTransaction()
    const fromAccount = await Account.findOne({ userId: req.userId }).session(session)
    if(!fromAccount || fromAccount.balance < amount) {
        session.abortTransaction()
        return res.status(400).json({ msg: 'Insufficient balance' })
    }

    const toAccount = await Account.findOne({ userId: to }).session(session)
    if(!toAccount) return res.status(400).json({ msg: 'Invalid To account' })

    await Account.updateOne({ userId: req.userId }, { $inc : {balance: -amount}}).session(session)
    await Account.updateOne({ userId: to }, { $inc: { balance: amount }}).session(session)

    await session.commitTransaction()
    return res.status(200).json({ msg: 'Transfer successfull' })
})

module.exports = [
    accountRouter
]