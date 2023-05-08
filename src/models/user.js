import { Schema, model } from "mongoose";
import isEmail from "validator";
import bj from "bcryptjs";
const { hash, compare } = bj;

const userSchema = Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    vaidate: (value) => {
      if (!isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true,
  },
  imagePath: {
    type: String,
    default: "/images/profile.png",
  },
  roles: [{ type: Number }],
  refreshToken: {
    type: String,
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  //   console.log(email);
  //   console.log(user);

  if (!user) {
    return undefined;
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return undefined;
  }

  return user;
};

userSchema.statics.getUserPublicData = async ({
  _id,
  displayName,
  email,
  imagePath,
  roles,
}) => {
  return {
    _id,
    displayName,
    email,
    imagePath,
    roles,
  };
};

userSchema.pre("save", async function (next) {
  const user = this;
  //   console.log(user);
  if (user.isModified("password")) {
    user.password = await hash(user.password, 8);
  }
  next();
});

const User = model("User", userSchema);

export default User;
