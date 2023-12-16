const Like = require('../models/like')

class LikeRepository {
    
    async create(data) {
        const like = new Like(data)
        try {
            await like.save();
            return like;
        } catch (error) {
            throw new Error(error)
        }
    }
    async findByUserAndLikeable(data) {
        try {
            const like = await Like.findOne(data).populate('likes');
            return like;
        } catch(error) {
            throw new Error(error);
        }
    }
}

module.exports = LikeRepository