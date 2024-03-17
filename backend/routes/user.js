const express = require('express')
const userRouter = express.Router()
const z = require('zod')
const jwt = require('jsonwebtoken')
const { User } = require('../db')
const { JWT_SECRET } = require('../config')
const { authMiddleware } = require('../middlewares/middleware')


// Zod schema for input validation
const signUpSchema = z.object({
    firstName: z.string().min(3).trim(),
    lastName: z.string().min(3).trim(),
    email: z.string().email().trim(),
    password: z.string().min(8).max(20).trim()
}) 

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20) 
})

const profileUpdateSchema = z.object({
    firstName: z.string().min(3).trim().optional(),
    lastName: z.string().min(3).trim().optional(),
    password: z.string().min(8).max(20).trim().optional()
})

/***  User routes start  ***/
userRouter.post('/signup', async (req, res) => {
    const user = req.body
    // validate user data
    const validatedData = signUpSchema.safeParse(user)    
    if(!validatedData.success) return res.status(422).json({ msg: 'Incorrect data provided' })    
    // check if user already exists
    const userExists = await User.findOne({ email: validatedData.data.email })
    if(userExists) return res.status(409).json({ msg : 'User already exists'})
    // save the user into database
    const userCreated = await User.create(validatedData.data)
    // jwt token
    const jwtToken = jwt.sign({ username: validatedData.data.email}, JWT_SECRET)
    res.status(200).json({ token: jwtToken})
})

userRouter.post('/signin', async (req, res) => {
    const user = req.body;
    // validate user data
    const validatedData = signInSchema.safeParse(user)
    if(!validatedData.success) return res.status(409).json({ msg: 'Incorrect user details'})
    // validate username and password
    const userExists = await User.findOne({ email: validatedData.data.email, password: validatedData.data.password})
    console.log(userExists)
    if(!userExists) return res.status(401).json({ msg: 'Incorrect username or password'})
    const token = jwt.sign({ username: userExists.email }, JWT_SECRET)
    res.status(200).json({ msg: `Welcome ${userExists.firstName }`, token: token })
})

userRouter.put('/', authMiddleware, async (req, res) => {
    const userUpdate = req.body
    const validatedData = profileUpdateSchema.safeParse(userUpdate)
    if(!validatedData.success) return res.status(409).json({ msg: 'Incorrect data'})
    await User.updateOne({ email: req.username }, validatedData.data)
    res.status(200).json({ msg: 'Profile has been updated successfully' })
})

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter
    const user = await User.find({
        $or: [
            { firstName: filter },
            { lastName: filter }
        ]
    })
    res.status(200).json(user)
})

module.exports = [
    userRouter
]