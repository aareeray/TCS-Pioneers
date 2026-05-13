const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['quote', 'theme', 'stat'],
    required: [true, 'Type is required']
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  },
  author: {
    type: String,
    default: ''
  },
  context: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quote', quoteSchema);
