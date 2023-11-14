import mongoose from "mongoose";

const testimonySchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    testifier: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,      
    }
}, {timestamp: true})

const Testimony = mongoose.models.Testimony || mongoose.model("Testimony", testimonySchema)

export default Testimony