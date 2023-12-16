const TweetRepository = require('../repository/tweetRepository')
const CommentRepository = require('../repository/commentRepository')

class CommentService {
    constructor (){
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(modelId,modelType,userId,content){
        if(modelType=='Tweet'){
            var commentable = await this.tweetRepository.getById(modelId)
        }
        else if(modelType=='Comment'){
            var commentable = await this.commentRepository.get(modelId)
        }
        else {
            throw new Error('Unknown model type')
        }
        const comment = await this.commentRepository.create({
            content: content,
            user: userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });
        //that is the reason we have array of comment in comment as well as tweet
        commentable.comments.push(comment);
        await commentable.save();
        return comment;
    }
}

module.exports = CommentService