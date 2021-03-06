import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Encriptar password
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

//Comparar password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default model("User", userSchema);
