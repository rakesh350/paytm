const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const user = require('../routes/user')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    const authArr = authHeader.split(' ')
    try {
        const verified = jwt.verify(authArr[1], JWT_SECRET)
        req.username = verified.username
        next()
    } catch (error) {
        return res.status(403).json({ msg: 'Invalid token' })
    }
}

module.exports = {
    authMiddleware,
}