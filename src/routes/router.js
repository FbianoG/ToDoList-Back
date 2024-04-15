const router = require('express').Router()
const control = require('../controllers/controller')
const jwt = require('../middlewares/jwt')

router.post("/createUser", control.createUser)
router.post("/login", control.login)
router.post("/getTasks", jwt.verifyToken, control.getTasks)
router.post("/createTask", jwt.verifyToken, control.createTask)
router.post("/deleteTask", jwt.verifyToken, control.deleteTask)
router.post("/updateTasks", jwt.verifyToken, control.updateTasks)
router.get("/", (req, res) => {
    res.json({ message: "Olá, mundo!" })
})

module.exports = router