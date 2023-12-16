const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
},{timestamps: true});

//hash the password using bcrypt and salt
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        const SALT = bcrypt.genSaltSync(9);
        const encryptedPassword = bcrypt.hashSync(user.password,SALT);
        user.password = encryptedPassword;
    }
    next();
}) 

userSchema.statics.comparePassword = async (email,password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    
    return user
}

userSchema.methods.generateAuthToken = async function() {
    return jwt.sign({ _id: this._id.toString() }, "twitter_secret", {
        expiresIn: '1h'
    })
}



const User = mongoose.model('User',userSchema)
module.exports = User