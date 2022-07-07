"use strict"

const DBConn = require('../database/dbConn')

class UserStorage {

    static #UserInfoQuery() {
        return "SELECT * FROM tb_ur001 WHERE email = ?"
    }

    static #tokenQuery() {
        return  "SELECT * FROM tb_ur001 WHERE email = ? AND token = ?"
    }

    static async getUserInfo(id){
        const select = new DBConn(this.#UserInfoQuery() ,[email, password])
        const data = await select.execute().catch(err => console.log)
        return data
    }

    static async getToken(id, token) {
        const select = new DBConn(this.#tokenQuery(), [email, token])
        let data = await select.execute().catch(err => console.log)
        if(data) {
            return data[0]
        }
        return data

    }

}

module.exports = UserStorage
