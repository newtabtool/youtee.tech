import mongoose from "mongoose";

const PublicTrailModel = mongoose.model('public_trail', {
    creator: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Object, required: false},
    category: { type: String, required: true },
    votes: { type: Number, required: false },
    stars: {type: Number, required:true},
    copys: { type: Number, required: false },
    videos: { type: Object, required: true},
    sponsored: {type: String, required: false}
})

export default PublicTrailModel;