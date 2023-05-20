import mongoose from "mongoose";

const VideoSchema = mongoose.model("video", {
    userId: { type: String, required: true },
    trailId: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    transcription: { type: String, required: false },
    notes: { type: String, required: true},
    related: [
        {
            title: { type: String, required: false },
            url: { type: String, required: false },
            channel: { type: String, required: false },
        }
    ]
});

export default VideoSchema;
