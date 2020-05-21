const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create task Schema & model
const TaskSchema = new Schema({
    created_by: {
        type:mongoose.Schema.Types.ObjectId, ref:'User',     
    },
    category:{
        type:mongoose.Schema.Types.ObjectId, ref:'Category',
    },
    name:{
        type:String
    },
    created_on:{
        type:Date,
        default:Date.now // Date.now() and Date.now
    },
    //date
    deadline:{
        type:Date
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;