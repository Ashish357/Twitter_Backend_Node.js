const Tweet = require('../models/tweet')

class TweetRepository {

    async create(data){
        const tweet = new Tweet(data)
        try {
            await tweet.save();
            return tweet;
        } catch (error) {
            throw error;
        }
    }

    async getById(id){
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments',
                populate: {
                    path: 'comments'
                }
            }).populate('likes');
            return tweet;
        } catch (error) {
            throw new Error(error)
        }
    }

    async get(){
        try {
            const tweet = await Tweet.find().populate({//this syntax is used to get comments and inside comments
                path: 'comments',
                populate: {
                    path: 'comments'
                }
            }).populate('likes');
            // console.log(tweet);
            return tweet;
        } catch (error) {
            throw error
        }
    }
}

module.exports = TweetRepository