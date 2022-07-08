
const UserStorage = require('./UserStorage')

class User {
    constructor(params) {
        this.params = params
    }

    async login() {
        let result = {
            rsp: 'fail'
        }
        const params = this.params
        const data = await UserStorage.getUserInfo(params.email)
        if(data){
            if(data?.email) {
                if(data.password != params.password){
                    result.rsp = 'wrong_password'
                } else {
                    const token = await UserStorage.putToken(params.email)
                    result.rsp = 'ok'
                    result.token = token
                }
            } else {
                result.rsp = 'no_email'
            }
        } else {
            result.rsp = 'no_email'
            result.email = params.email
        }
        return result
    }

    async checkToken() {
        let result = {
            rsp: 'fail'
        }
        const params = this.params
        const data =  await UserStorage.getToken(params.email, params.token)
        if(data) {
            result.rsp = 'ok'
        }
        return result
    }

}

module.exports = User