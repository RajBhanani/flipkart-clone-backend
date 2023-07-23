import User from "../model/user_schema.js";

export const userSignup = async (request, response) => {
  try {
    const user = request.body;
    const findUsername = await User.findOne({ userName: user.userName });
    const findEmail = await User.findOne({ email: user.email });
    const findPhone = await User.findOne({ phone: user.phone });
    if (findUsername) {
      return response.status(401).json({ message: "Username already exists" });
    } else if (findEmail) {
      return response.status(401).json({ message: "Email already exists" });
    } else if (findPhone) {
      return response.status(401).json({ message: "Phone already exists" });
    }
    const newUser = new User(user);
    await newUser.save();
    response.status(200).json({ message: user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    const user = request.body;
    const findUser = await User.findOne({
      $or: [{ phone: user.loginAccount }, { email: user.loginAccount }],
    });
    if (findUser) {
      if (user.loginPassword === findUser.password) {
        return response.status(200).json({
          message: `${findUser.firstName + " " + findUser.lastName} logged in`
        });
      } else {
        return response.status(401).json({ message: "wrong password" });
      }
    } else {
      return response.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
