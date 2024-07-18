const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = NoteModel;
