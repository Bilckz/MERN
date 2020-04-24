const mongoose = require('../../database');

const CodeSchema = new mongoose.Schema({
    trackingCode: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Code = mongoose.model('Code', CodeSchema);

module.exports = Code;