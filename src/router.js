import express from 'express';
import { createNote, deleteNote, getArchivedNotes, getNotes, updateNote } from './controller/note.js';

const router = express.Router();


router.get('/note', getNotes);
router.get('/note/archived', getArchivedNotes);
router.post('/note', createNote);
router.put('/note/:id', updateNote);
router.delete('/note/:id', deleteNote);



export default router;