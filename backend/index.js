const express = require("express")
const cors = require('cors')
const router = require('./routes')

const app = new express()

// Middlewares
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)


app.listen(3000, ()=>{
    console.log(`Server is running at port : 3000`)
})




