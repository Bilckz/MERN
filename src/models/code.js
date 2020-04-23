const mongoose = require('../database');

const CodeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }
})

const Code = mongoose.model('Code', CodeSchema);

module.exports = Code;