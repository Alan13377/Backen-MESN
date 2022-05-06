import User from "../models/User";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const signUp = async (request, response) => {
  try {
    //Guardar usuario
    const { name, email, password } = request.body;

    const user = new User({
      name,
      email,
      password,
    });

    user.password = await user.encryptPassword(password);
    console.log(user);
    const saveUser = await user.save();

    //response.send(saveUser);
    //Token
    const token = jwt.sign(
      {
        _id: saveUser._id,
      },
      process.env.TOKEN_SECRET
    );
    response.status(200).json(token);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

//Iniciar sesion
export const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    //Si no encontro al usuario
    if (!user) return response.status(404).json({ message: "Incorrect email" });

    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
      return response.status(404).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: 60 * 60 * 24 }
    );
    response.status(200).json(token);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
