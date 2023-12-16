const Comment = require('../models/comment')

class CommentRepository{

    async create(data){
        const comment = new Comment(data);
        try {
            await comment.save();
            return comment;
        } catch (error) {
            throw new Error(error)
        }
    }

    async get(modelId) {
        try {
           const comment = await Comment.findById(modelId).populate('comments')
           console.log(comment);
           return comment;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = CommentRepository