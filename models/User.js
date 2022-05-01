const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const reactionSchema = require('./Reaction');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    //   must match a valid email address
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  }
);

const User = model('user', userSchema);

module.exports = User;