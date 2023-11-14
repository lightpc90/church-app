import mongoose from "mongoose";

const prayerReqSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    }
}, {timestamp: true})

const PrayerReq = mongoose.models.PrayerReq || mongoose.model('PrayerReq', prayerReqSchema)

export default PrayerReq