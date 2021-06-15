var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema ({
    name: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('User',userSchema);