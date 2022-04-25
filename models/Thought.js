const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


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
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

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



  ThoughtSchema.virtual('responseCount').get(function() {
    return this.response.length;
  });
  
// create the thought model using the thoughtSchema
const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
