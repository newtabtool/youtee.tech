import mongoose from "mongoose";

const UserSchema = mongoose.model('User',{
    email: { type: String , required: true},
    password: { type: String, required: true},
    premium: { type: Boolean, required: true},
    id_google:{ type: String, required: false},
    premium_since:{type: Date, required: false}
})

export default UserSchema;