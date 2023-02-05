
const sqlite = require('sqlite3')


const database = new sqlite.Database("./db/eleicoes2022-pi.db", (error) => {
    if (error) {
        console.log(error.message)
    }
})

module.exports = {
    database
}
