const { mongoose, Schema } = require('mongoose')
const { MONGODB_URL } = require('./config')

mongoose.connect(MONGODB_URL)

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String
})

const AccountSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'UserSchemUser' },
    balance: Number
})

const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', AccountSchema)

module.exports = {
    User,
    Account
}
