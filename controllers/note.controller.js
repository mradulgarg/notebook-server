const NoteModel = require("../models/note.model");

const create = async (req, res) => {
  const { title, description, status, userId, userName } = req.body;
  try {
    const note = new NoteModel({
      title,
      description,
      status,
      userId,
      userName,
    });
    await note.save();
    res.status(200).send("Note created successfully");
  } catch (error) {
    res.status(500).send("Internal server error || Error in creating note");
  }
};

const read = async (req, res) => {
  const { userId } = req.body;
  try {
    const notes = await NoteModel.find({ userId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send("Internal server error || Error in fetching notes");
  }
};

const update = async (req, res) => {
  const { title, description, status, userId, userName } = req.body;
  const { noteId } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteId });
    if (note.userId == userId) {
      await NoteModel.updateOne(
        { _id: noteId },
        { $set: { title, description, status } }
      );
      res.status(200).send("Note updated successfully");
    } else {
      res.status(401).send("You are not authorized to update this note");
    }
  } catch (error) {
    res.status(401).send("You are not authorized to update this note");
  }
};

const remove = async (req, res) => {
  const { userId } = req.body;
  const { noteId } = req.params;
  try {
    const note = await NoteModel.findOne({ _id: noteId });
    if (note.userId == userId) {
      await NoteModel.deleteOne({ _id: noteId });
      res.status(200).send("Note deleted successfully");
    } else {
      res.status(401).send("You are not authorized to delete this note");
    }
  } catch (error) {
    res.status(500).send("Internal server error || Error in deleting note");
  }
};

module.exports = { create, read, update, remove };
