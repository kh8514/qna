"use strict"

const User = require('../../models/User')

module.exports = {
    login: async ( req, res) => {
        const user = new User(req.body)
        const response = await user.login()
        return res.json(response)
    },
    
    checkToken: async (req, res) => {
        const user = new User(req.body)
        const response = await user.checkToken()
        return res.json(response)
    }
}
