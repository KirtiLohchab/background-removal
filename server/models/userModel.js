import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  creditBalance: { type: Number, default: 5 },
  photo: { type: String, required: true },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
