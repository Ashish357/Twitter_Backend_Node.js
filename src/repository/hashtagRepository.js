const Hashtag = require('../models/hashtag');

class HashtagRepository {

    async bulkCreate(data) {
        console.log(data);
        try {
            const tags = await Hashtag.insertMany(data);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }

    async findByName(titleList){
        try {
            const tags = await Hashtag.find({
                title: titleList
            }).populate({
                path:'tweets'
            });
            console.log(tags);
            return tags;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = HashtagRepository;