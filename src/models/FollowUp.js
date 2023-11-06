import mongoose from "mongoose";

const followUpSchema = ({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    residentialAddr: {
        type: String,
        required: [true, 'Please enter your Residential Address'],        
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: [true, 'Please provide a valid Phone number'],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        },
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
    },
    formType: {
        type: String,
        enum: ['firstTimer', 'altartCall']
    },
    dateTime: {
        type: Date,
        default: Date.now(),
    }
})

const FollowUp = mongoose.models.FollowUp || mongoose.model('FollowUp', followUpSchema)

export default FollowUp