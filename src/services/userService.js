const User = require('../models/user')
class userService {

    async signUp (data) {
        const user = new User(data)
        // console.log(user);
        try {
            await user.save();
            return user;
        } catch (error) {
            throw error
        }
    }

    async signIn (data) {
        try {
            const user = await User.comparePassword(data.email,data.password)
            const token = await user.generateAuthToken()
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = userService