var mongoose = require('mongoose');

var schema = mongoose.Schema;

var quizSchema = new schema({
    number: {
        type: number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        time: 15,
        mcqs: [{}],
    },
});
module.exports = mongoose.model('Quiz', quizSchema);