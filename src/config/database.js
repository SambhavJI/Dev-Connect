const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sambhavtrivedi84:N6m7AymMgHyg8Hww@cluster0.hw66qrm.mongodb.net/DevConnect")
}

module.exports= connectDB;