import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
