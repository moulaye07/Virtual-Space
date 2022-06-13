const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
        trim: true
      },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 3
    },
    role: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "./img/user.png"
  },
  },
  {
    timestamps: true,
  }
);
//play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      return user;
    }else{
      return { errorPassword: "mot de passe incorrect"}
    }
  }
  throw Error('username incorrect')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;