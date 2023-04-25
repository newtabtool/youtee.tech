import mongoose from "mongoose";

const MarketingModel = mongoose.model('campaign', {
    read: { type: Number, required: true }
})

export default MarketingModel;