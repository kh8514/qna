module.exports.setup = (app, db) => {
    app.get('/', (req, res, next) => {
        res.join({ rsp: 'ok'})
    })
    
}