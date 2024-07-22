const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
