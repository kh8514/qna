
"use strict"

const ctrl = require('./ctrl/user.ctrl')

module.exports.setup = (app) => {
    app.post('/db/accounts/login', ctrl.login)
    app.post('/db/accounts/check-token', ctrl.checkToken)

}