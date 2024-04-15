const express = require('express')
const router = require('./src/routes/router.js')
const DataBase = require("./src/dataBase/db.js")

const cors = require('cors')
const app = express()
const port = 3000
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: 'Authorization',
}

app.use(cors(corsOptions));


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

DataBase.connectDataBase()

app.listen(port, () => {
    console.log(`Servidor funcionando na porta:`, port)
})
