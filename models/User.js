const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
// const reactionSchema = require('./Reaction');

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
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  }
);

//virtual that creates a friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;