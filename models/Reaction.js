const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minItems: 0,
      maxItems: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },  
  }
);

module.exports = reactionSchema;