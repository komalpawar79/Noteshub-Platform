const express = require('express');
const { uploadNote, getNotes, getNoteById, likeNote, downloadNote, updateNoteStatus, deleteNote } = require('../controllers/noteController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, upload.single('file'), uploadNote);
router.get('/', protect, getNotes);
router.get('/:id', protect, getNoteById);
router.post('/:id/like', protect, likeNote);
router.post('/:id/download', protect, downloadNote);
router.put('/:id/status', protect, authorize('admin'), updateNoteStatus);
router.delete('/:id', protect, authorize('admin', 'faculty'), deleteNote);

module.exports = router;
