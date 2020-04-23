const mongoose = require('../database');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
    }
})

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;