import mongoose from "mongoose";

const TrailModel = mongoose.model('trail', {
    creator: { type: String, required: true },
    publik: { type: Boolean, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, required: false },
    tags: { type: Object, required: false}
    
})

export default TrailModel;