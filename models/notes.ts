import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  meetingId: {
    type: Schema.Types.ObjectId,
    ref: 'Meeting',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default model('Note', noteSchema);
