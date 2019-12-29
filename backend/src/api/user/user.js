const restful = require('node-restful'),
    mongoose = restful.mongoose,
    userSchema = new mongoose.Schema({
        name: { type: String, require: true },
        email: { type: String, required: true },
        password: { type: String, min: 6, max: 12, required: true }
    })

module.exports = restful.model('User', userSchema)