const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    default: "Student",
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
    
  }],
});

//Mongoose changes password every time, when I save user updates.
/* UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (error, hash) => {
    this.password = hash;
    next();
  });
}); */

UserSchema.pre('save', function(next){
  if (!this.isModified('password')) return next();

  const user = this;
  
  bcrypt.genSalt(10, function(err, salt){
      if (err){ return next(err) }

      bcrypt.hash(user.password, salt, function(err, hash){
          if(err){return next(err)}

          user.password = hash;
          next();
      })
 })
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
