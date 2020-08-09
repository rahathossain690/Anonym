const mongoose = require('mongoose')

// username, email, password, date_of_creation, is_active, is_verified

module.exports = mongoose.model('Profile', {
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date_of_creation: {
        type: Date,
        default: Date.now() 
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_verified: {
        type: Boolean,
        default: false
    }
})