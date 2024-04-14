const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.URI_DOT

async function connectDataBase() {
    try {
        await mongoose.connect(URI)
        console.log("DataBase connected")
    } catch (error) {
        console.log("ERROR DataBase", error)
    }
}

module.exports = { connectDataBase }
