const mongoose = require('mongoose');


const connection = mongoose.connect('mongodb+srv://channa:channa@cluster0.dlh6wdk.mongodb.net/users?retryWrites=true&w=majority')


module.exports = connection ; 