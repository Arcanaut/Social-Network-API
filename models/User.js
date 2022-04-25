//regex originally assignment option for module 17 weekly project. 
//validateEmail taken and formatted from photo-port 
const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
  let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return regex.test(String(email).toLowerCase());
}
//how to validate email in a mongoose schema
//https://mongoosejs.com/docs/validation.html
//TODO: Set up User.js Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // https://mongoosejs.com/docs/validation.html
      // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      validate: {
        validator: validateEmail,
        message: `invalid email`
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ]},
    {
      toJSON: {
        virtuals: true
      },
      id: false
    }
  )

  const User = model('User', UserSchema);

  module.exports = User;