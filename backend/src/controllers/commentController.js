const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.create({
      noteId: req.params.noteId,
      userId: req.user._id,
      text
    });

    const populatedComment = await Comment.findById(comment._id).populate('userId', 'name avatar');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ noteId: req.params.noteId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
