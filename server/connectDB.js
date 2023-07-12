const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DB connected ${connect.connection.host}`)
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB