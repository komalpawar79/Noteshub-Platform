const express = require('express');
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/:noteId', protect, addComment);
router.get('/:noteId', protect, getComments);
router.delete('/:id', protect, deleteComment);

module.exports = router;
