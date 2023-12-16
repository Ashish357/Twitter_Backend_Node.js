const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250,'Tweet cannot be more then 250 character']
    },
    //A tweet can have array of likes and comments
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{timestamps: true})

const Tweet = mongoose.model('Tweet',tweetSchema);

module.exports = Tweet