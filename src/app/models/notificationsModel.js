import mongoose from "mongoose";

const notificationsSchema = mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  read: { type: Boolean, required: true },
});

const notificationsModel = mongoose.model("notification", notificationsSchema);

export default notificationsModel;
