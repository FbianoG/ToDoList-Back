const express = require('express')
const router = require("./src/routes/router.js")
const DataBase = require("./src/dataBase/db.js")
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
  }



const app = express()
const port = 3000
app.use(cors(corsOptions))



app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

DataBase.connectDataBase()

app.listen(port, () => {
    console.log(`Servidor funcionando: http://localhost:` + port)
})



