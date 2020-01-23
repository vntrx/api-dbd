const mongoose = require('mongoose');

const TalkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  upVotes: {
    type: Number,
    required: false,
    default: 0
  }
});

export default mongoose.model('Talk', TalkSchema);
