import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    role: { type: String, default: 'user' },
    authProviderId: { type: String } // for google and github
})

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
