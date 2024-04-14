const mongoose = require('mongoose')




const User = mongoose.model("User", {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    tasks: [
        {
            task: String,
            category: String,
            date: Date,
            check: Boolean
        }
    ]
})



module.exports = { User }