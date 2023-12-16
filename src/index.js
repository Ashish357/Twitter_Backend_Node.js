const express = require('express')
require('./config/database')
const apiRoutes = require('./routes/index');
// const TweetRepository = require('./repository/tweetRepository');
const passport = require('passport')

const passportAuth = require('./config/auth-middleware.js');

const app = express();
app.use(express.json());
app.use('/api',apiRoutes)

app.use(passport.initialize());
passportAuth(passport);

app.listen(3000, async () => {
    console.log('Server started');
    // const tweetRepository = new TweetRepository()
    // const tweet = await tweetRepository.getById('6572e39895f28733a964c6c6')
    // console.log(tweet);
})