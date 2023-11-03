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
    date: {
        type: Date,
        default: Date.now(),
    },
    read: {
        type: Boolean,
        default: false,      
    }
})

const Testimony = mongoose.model.Testimony || mongoose.model("Testimony", testimonySchema)

export default Testimony