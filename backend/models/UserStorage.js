"use strict"

const DBConn = require('../database/dbConn')

class UserStorage {

    static #UserInfoQuery() {
        return "SELECT * FROM tb_ur001 WHERE email = ?"
    }

    static #tokenInfoQuery() {
        return  "SELECT * FROM tb_ur001 WHERE email = ? AND token = ?"
    }

    static #tokenUpdateQuery() {
        return "UPDATE tb_ur001 SET token = ? WHERE email =?"
    }

    static async getUserInfo(id){
        const select = new DBConn(this.#UserInfoQuery() ,[id])
        const data = await select.execute().catch(err => console.log)
        if(data){
            return data[0]
        }
        return data
    }

    static async getToken(id, token) {
        const select = new DBConn(this.#tokenInfoQuery(), [id, token])
        let data = await select.execute().catch(err => console.log)
        if(data) {
            return data[0]
        }
        return data
    }
    
    static async putToken(id) {
        const token = 'T-' + Math.floor(Math.random() * 100000).toString()
        const update = new DBConn(this.#tokenUpdateQuery(), [token, id])
        await update.execute().catch(err => console.log)
        return token
    }

}

module.exports = UserStorage
