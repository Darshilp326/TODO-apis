const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create task Schema & model
const TaskSchema = new Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId, ref:'user',     
    },
    category:{
        type:mongoose.Schema.Types.ObjectId, ref:"category",
    },
    body:{
        type:String
    },
    createdOn:{
        type:Date,
        default:Date.now()
    },
    deadline:{
        type:String
    }
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;