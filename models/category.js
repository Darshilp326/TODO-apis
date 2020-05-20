const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create task Schema & model
const CategorySchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    },
    name: {
        type:String     
    },
    createdOn:{
        type:Date,
        default:Date.now()

    },
    createdBy:{
       type:String
    }
});

const Category = mongoose.model('category', CategorySchema);

module.exports = Category;