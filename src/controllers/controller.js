const { User } = require('../models/model.js')
const { hashPassword, comparePassword } = require('../middlewares/bcrypt.js')
const { createToken } = require('../middlewares/jwt.js')



async function createUser(req, res) {
    try {
        let { email, password, name } = req.body
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Preencha todos os campos." })
        }
        email = email.toLowerCase()
        name = name.toLowerCase()
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({ message: "Email já está sendo usado." })
        }
        const cryptPassword = await hashPassword(password)
        const newUser = await User.create({ email, password: cryptPassword, name })
        return res.status(201).json({ message: "Usuário criado com sucesso!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno de servidor." })
    }
}

async function login(req, res) {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Preencha todos os campos." })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Email ou senha inválidos.", auth: false })
        }
        const hashedPassword = await comparePassword(password, user.password)
        if (!hashedPassword) {
            return res.status(401).json({ message: "Email ou senha inválidos.", auth: false })
        }
        const token = await createToken(user._id)
        return res.status(200).json({ message: "Logado com sucesso!", auth: true, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno de servidor." })
    }
}

async function getTasks(req, res) {
    const id = req.userId
    try {
        const user = await User.findById({ _id: id })
        if (!user) {
            return res.status(400).json({ message: "Dados não encontrados." })
        }
        return res.status(200).json(user.tasks)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro interno de servido." })
    }
}

async function createTask(req, res) {
    const id = req.userId
    const { task, category } = req.body
    const newTask = { task, category, date: new Date(), check: false }
    try {
        const user = await User.findById({ _id: id })
        if (!user) {
            return res.status(400).json({ message: "Dados não encontrados." })
        }
        const updateTask = await User.findByIdAndUpdate({ _id: id }, { tasks: [...user.tasks, newTask] })
        return res.status(200).json({ message: "Tarefa incluída com sucesso!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno de servidor." })
    }
}

async function deleteTask(req, res) {
    const id = req.userId
    const { tasks } = req.body
    try {
        const updateTask = await User.findByIdAndUpdate({ _id: id }, { tasks })
        if (!updateTask) {
            return res.status(400).json({ message: "Dados não encontrados." })
        }
        return res.status(200).json({ message: "Tarefa excluída com sucesso!" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno de servidor." })
    }
}

async function updateTasks(req, res) {
    const id = req.userId
    const { tasks } = req.body
    try {
        const updateTask = await User.findByIdAndUpdate({ _id: id }, { tasks })
        if (!updateTask) {
            return res.status(400).json({ message: "Dados não encontrados." })
        }
        return res.status(200).json({ message: "Tarefa atualizada com sucesso!" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro interno de servidor." })
    }
}



module.exports = { createUser, login, getTasks, createTask, deleteTask, updateTasks }