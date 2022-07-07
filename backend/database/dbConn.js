"use strict"

const mariadb = require('mariadb')

class DBConn {

    constructor(query, params){
        this.query = query
        this.params = params
        this. pool = mariadb.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB,
            connectionLimit: 10
        })
    }

    async execute() {
        let conn, rows
        try {
            conn = await this.pool.getConnection()
            if(this. params){
                rows = await conn.query(this.query, this.params)
            } else {
                rows = await conn.query(this.query)
            }
        } 
        catch (error) {
            console.log("=========================")
            console.log("DB ERROR :: ",err)
            console.log("=========================")
            throw err
        }
        finally {
            conn.end()
            return rows
        }
    }

}


module.exports = DBConn