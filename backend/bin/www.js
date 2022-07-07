const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()

const get = require("../modules/get")
const post = require("../modules/post")



const port = process.env.PORT || 3000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.disable('x-powered-by')
app.use(cors())
app.use('/assets', express.static('assets'))

get.setup(app)
post.setup(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
