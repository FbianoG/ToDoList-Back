const express = require('express')
const router = require('./src/routes/router.js')
const DataBase = require('./src/dataBase/db.js')
const socketIo = require('socket.io');
const http = require('http');


const cors = require('cors')


const app = express()
const port = 3000

const server = http.createServer(app);
const io = socketIo(server);



io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Exemplo: enviar uma mensagem para o cliente conectado
    socket.emit('message', 'Bem-vindo ao servidor!');
    
    // Exemplo: ouvir uma mensagem do cliente
    socket.on('clientMessage', (data) => {
        console.log('Mensagem recebida do cliente:', data);
    });

    // Exemplo: enviar uma mensagem para todos os clientes
    io.emit('broadcast', 'Mensagem para todos os clientes');
});







app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

DataBase.connectDataBase()

app.listen(port, () => {
    console.log(`Servidor funcionando na porta:`, port)
})




