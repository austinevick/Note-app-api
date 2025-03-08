import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    isPinned: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false }
}, {
    timestamps: true
});

const NoteModel = mongoose.model('Note', noteSchema);

export default NoteModel;