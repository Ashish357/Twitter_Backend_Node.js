const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet','Comment']
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{timestamps: true})

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;
//The ref option is used to specify the name of the model that the ObjectId refers to. This is a static reference, meaning that it does not change based on the values in the documents.
//The refPath option allows you to dynamically determine the referenced model based on the value of another field in the document.