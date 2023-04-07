import mongoose from "mongoose";

const TrailModel = mongoose.model('trail', {
    creator: { type: String, required: true },
    publik: { type: Boolean, required: true },
    id_public: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: false },
    likes: { type: Number, required: false },
    tags: { type: Object, required: false},
    copy_of: {type: String, require:false},
    evaluated:{ type: Boolean, required: false }
    
})

export default TrailModel;