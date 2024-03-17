const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const user = require('../routes/user')

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const authArr = authHeader.split(' ')
        const verified = jwt.verify(authArr[1], JWT_SECRET)
        req.userId = verified.userId
        next()
    } catch (error) {
        return res.status(403).json({ msg: 'Invalid token' })
    }
}

module.exports = {
    authMiddleware,
}