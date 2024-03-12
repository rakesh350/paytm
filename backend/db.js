const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://otter_dbuser:***********@otter-cluster.wxor4d5.mongodb.net/paytm')

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
