var mongoose = require('mongoose');
var schema = mongoose.Schema;

var assignmentSchema = new schema({
    number: {
        type: number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Assignment', assignmentSchema);