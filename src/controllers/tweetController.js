const TweetService = require('../services/tweetService')

const tweetService = new TweetService();

const createTweet = async (req,res) => {
    try {
        const response = await tweetService.create(req.body);
        res.status(201).send({
            success: true,
            message: 'Successfully created tweet',
            data: response,
            err: {}
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Unable to create tweet',
            data: {},
            err: error
        })
    }
}

const getTweet = async (req,res) => {
    try {
        const response = await tweetService.get()
        res.send({
            success: true,
            message: 'Successfully fetched tweet',
            data: response,
            err: {}
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'failed to get tweet',
            data: {},
            err: error
        })
    }
}

module.exports = {
    createTweet,
    getTweet
}