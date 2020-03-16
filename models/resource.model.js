const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema(
  {
    name: String,
    qty: Number
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
