const TweetRepository = require('../repository/tweetRepository')
const HashtagRepository = require('../repository/hashtagRepository')

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content
        const tags = content.match(/#[A-Za-z0-9_]+/g)
                    .map((tag) => tag.substring(1).toLowerCase()); //to remove hastag symbol
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);//it will return tags with title and tweet objectid
        let titleOfPresentTags = alreadyPresentTags.map(tags => tags.title);//extract only title from alreadyPresentTags
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag))
        console.log(newTags);
        newTags = newTags.map(tag => {
            return {title: tag, tweets: tweet.id}
        });
        console.log(newTags);
        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;
    }

    async get(){
        const tweet = await this.tweetRepository.get();
        return tweet;
    }
}

module.exports = TweetService