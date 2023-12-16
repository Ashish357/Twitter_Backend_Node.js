const UserService = require('../services/userService')

const userService = new UserService();

const signUp = async (req, res) => {
    try {
        const response = await userService.signUp(req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            err: error
        });
    }
}

const login = async (req,res) => {
    try {
        const token = await userService.signIn(req.body)
        return res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            data: token,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Invalid name or password',
            data: {},
            err: error
        })
    }
}

const users =  (req,res) => {
    res.send("Welcome")
}

module.exports = {
    signUp,
    login,
    users
}