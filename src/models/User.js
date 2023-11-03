import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,        
    },
    email: {
        type: String,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    birthdayMonth: {
        type: String,
    },
    birthdayDay: {
        type: Number,
    },
    dept: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
    
})

const User = mongoose.model.User || mongoose.model('User', userSchema)

export default User