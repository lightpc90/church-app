import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventOccurrence: { type: String},
    eventDate: { type: Date},
    eventTime: {type: String},
    eventImage: {
     type: String, 
    },
    eventRegLink: {
        type: String, 
    },
    uploadedBy: {type: String}
}, {timestamps: true})

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)

export default Event