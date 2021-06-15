var mongoose = require('mongoose');
var schema = mongoose.Schema;

var assignmentSchema = new schema({
    number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    questions: [{
        type: String
    }],
    class: {
        type: schema.Types.ObjectId,
        ref: 'Class'
    }
});
module.exports = mongoose.model('Assignment', assignmentSchema);