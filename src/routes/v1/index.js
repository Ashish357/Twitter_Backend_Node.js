const express = require('express');
const {signUp,login,users} = require('../../controllers/authController')
const {createTweet,getTweet} = require('../../controllers/tweetController')
const {toggleLike} = require('../../controllers/likeController')
const {createComment} = require('../../controllers/commentController')
const authenticate = require('../../middleware/authenticate')

const router = express.Router()

router.post('/signup', signUp);
router.post('/login', login);
router.get('/user', users);

router.post('/tweet',authenticate,createTweet);
router.get('/tweet',authenticate , getTweet);

router.post('/likes/toggle',authenticate,toggleLike);

router.post('/comments', authenticate, createComment);



module.exports = router