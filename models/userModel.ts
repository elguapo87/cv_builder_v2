import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.comparePassword = async function(password: string) {
    return bcrypt.compare(password, this.password);
}

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;