const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    thoughtBody: {
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

const ResponseSchema = new Schema(
    {
      writtenBy: {
        type: String,
        require: true,
      },
      responseBody: {
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

  ResponseSchema.virtual('thoughtCount').get(function() {
    return this.replies.length;
  });
  
// create the response model using the responseSchema
const Response = model('response', ResponseSchema);

module.exports = Response;
