import mongoose from "mongoose";

const UserSchema = mongoose.model('User',{
    email: { type: String , required: true},
    password: { type: String, required: false},
    premium: { type: Boolean, required: true},
    id_google:{ type: String, required: false},
    premium_since:{type: Date, required: false},
    accept_email_contact:{type: Boolean, required: false},
    accept_email_news:{type:Boolean, required:false},
    accept_email_promo:{ type: Boolean, required: false}
})

export default UserSchema;
