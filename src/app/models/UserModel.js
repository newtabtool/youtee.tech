import mongoose from "mongoose";

const UserSchema = mongoose.model('User',{
    email: { type: String , required: true},
    password: { type: String, required: true},
    premium: { type: Boolean, required: true}
})

export default UserSchema;