
const UserStorage = require('./UserStorage')

class User {
    constructor(params) {
        this.params = params
    }

    async login() {
        const params = this.params
        const data = await UserStorage.getUserInfo(params.email, params.password)
        if(data){
            console.log(data)
            return {success: true, result:data}
        }
        return {success: false, msg: ""}
    }

    async checkToken() {
        const result = {
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