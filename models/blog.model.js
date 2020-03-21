const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogpostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    references: { type: [String] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Blogpost = mongoose.model('Blogpost', blogpostSchema);

module.exports = Blogpost;
