const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config()

const get = require("../modules/get")

const port = process.env.PORT || 3000;

const app = express()

app.use(cors())
app.use(express.json())
app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


console.log("env :: ",process.env.PORT)
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

get.setup(app)