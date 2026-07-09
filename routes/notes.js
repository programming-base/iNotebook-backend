import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import Note from "../models/notes.js";
import express from "express";
const router = express.Router();
// GET all notes of the authenticated user
router.get("/mynotes", isAuthenticated, async (req, res) => {
  try {
    const notesfromdb = await Note.find({ user: req.user._id });
    console.log("Fetched notes:", notesfromdb);
    res.status(200).json(notesfromdb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST: Add a new note
router.post("/addnote", isAuthenticated, async (req, res) => {
  const { title, description, tag } = req.body;
  const note = new Note({
    user: req.user._id,
    title,
    description,
    tag,
  });
  try {
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET a specific note by ID
router.get("/getnote/:id", isAuthenticated, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized access to note" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update a note
router.put("/updatenote/:id", isAuthenticated, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const existingNote = await Note.findById(req.params.id);
    if (!existingNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (existingNote.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to update this note" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description, tag },
      { new: true }
    );
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deletenote/:id", isAuthenticated, async (req, res) => {
  const noteid = req.params.id;
  try {
    const deletenote = await Note.findById(noteid);
    if (!deletenote) {
      res.status(404).json({ error: "Note note found" });
    }
    if (deletenote.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Note not found,nothing to delete" });
    }
    await Note.findByIdAndDelete(noteid);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
