const mongoose = require('mongoose')
const { MONGODB_URL } = require('./config')

mongoose.connect(MONGODB_URL)

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String
})

const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}
