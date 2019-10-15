const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/mymoney', { useNewUrlParser: true })

mongoose.Error.messages.general.required = "The '{PATH}' attribute is required."
mongoose.Error.messages.Number.min = "The {VALUE} is less than the {MIN} informed limit"
mongoose.Error.messages.Number.max = "The {VALUE} is greater than the {MAX} informed limit"
mongoose.Error.messages.String.enum = "The {VALUE} is not valid for {PATH} attribute"