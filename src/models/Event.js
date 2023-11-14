import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    dateTime: { type: Date, required: true },
    flierUrl: {
     type: String, required: false 
    },
    regLink: {
        type: String, required: false
    }
}, {timestamps: true})

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)

export default Event