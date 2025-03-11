import express from 'express';
import { createNote, deleteNote, getArchivedNotes, getNotes, updateNote } from './controller/note.js';
import { login, register } from './controller/user.js';
import { loginValidation, registerValidation } from './middleware/SchemaValidation.js';

const router = express.Router();


//// Auth
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);


//// Notes
router.get('/note', getNotes);
router.get('/note/archived', getArchivedNotes);
router.post('/note', createNote);
router.put('/note/:id', updateNote);
router.delete('/note/:id', deleteNote);

export default router;