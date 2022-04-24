const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ResponseSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    responseId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    responseBody: {
      type: String,
      required: true,
      trim:true
    },
    writtenBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
    {
      writtenBy: {
        type: String,
        require: true,
      },
      thoughtBody: {
        type: String,
        required: true,
        trim:true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use thoughtSchema to validate data for a thought
      replies: [ThoughtSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  ResponseSchema.virtual('responseCount').get(function() {
    return this.replies.length;
  });
  
// create the thought model using the thoughtSchema
const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
