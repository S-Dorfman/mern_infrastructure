// models>user.js

const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//* The SALT_ROUNDSvariable determines how much processing time it will take to perform the hash.
const SALT_ROUNDS = 6;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    } 
  },{
    timestamps: true,
    //We never want to store passwords as plain text, known as "clear text".
    // Instead, we need to hash the password anytime it has changed and store the hash instead.
    toJSON: function(doc, ret) {
    delete ret.password;
    return ret;
    }
});

//* Pre Hook 
userSchema.pre('save', async function(next) {
    // if password was NOT modified continue to the next middleware 
    // (this = userSchema)
    if (!this.isModified('password')) return next();

    // hash the password - override plain text password and set it to the hash password
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next();
}) 

module.exports = mongoose.model('User', userSchema);