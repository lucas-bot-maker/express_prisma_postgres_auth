import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generate_jwt } from "../middlewares/authMiddleware.js";
import { messenger } from "../config/email.js";

export const register = async (req, res) => {
  try {
    // get values from user form
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide name, email and password" });
    }

    // check if user already exist
    const exist_user = await prisma.user.findUnique({ where: { email } });
    if (exist_user)
      return res.status(400).json({ message: "user already exist" });

    // hash the password
    const hashed_password = await bcrypt.hash(password, 10);

    // save user to db
    const user = await prisma.user.create({
      data: { name, email, password: hashed_password, role },
        select: { id: true, name: true, email: true, role: true },
    });
    try {
  const info = await messenger.sendMail({
    to: email,
    subject: "User Registration",
    text: `hello ${name}, your account has been registered successfully`,
  });
  // console.log("email status:", info);
} catch (err) {
  console.error("email send failed:", err);
}
    // return res.sendStatus(201);
    return res.status(201).json({ message: "created", data: user });
  } catch (error) {
    console.error("[/register] error: ", error.message);
    return res.sendStatus(500);
  }
};

// login endpoint
export const login = async (req, res) => {
  try {
    // console.log("username:", req.user_name);
    // get email and password
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide, email and password" });
    }
    // check if user exist
    const exist_user = await prisma.user.findUnique({ where: { email } });
    if (!exist_user)
      return res.status(400).json({ message: "invalid credentials" });

    console.log("exist_user_password: ", typeof exist_user.password);
    // compare password
    const is_password_match = await bcrypt.compare(
      password,
      exist_user.password,
    );
    if (!is_password_match)
      return res.status(400).json({ message: "invalid data" });

    // return (jwt token)
    // const token = await generate_jwt({ user_id: exist_user.id });
    const token = await generate_jwt({ user_id: exist_user.id, role: exist_user.role });
    return res.status(200).json({ token });
  } catch (error) {
    // console.error("[/login] error: ", error.message);
    return res.sendStatus(500);
  }
};

// auth user profile
export const me = async (req, res) => {
  try {
    const user_id = req.user_id;
    console.log("user_id: ", user_id);
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
          select: {
        id: true,
        email: true,
        name: true,
        role: true,}
    });
    if (!user) return res.sendStatus(404);

    return res
      .status(200)
      .json({ message: "user retrieved successfully", data: user });
  } catch (error) {
    console.error("[auth/me] error occured: ", error.message);
    return res.sendStatus(500);
  }
};

// change password
export const change_password = async (req, res) => {
  try {
    const user_id = req.user_id;
    if (!user_id) return res.sendStatus(401);

    // const user = await prisma.user.findUnique({ where: { id: user_id } });
    // if (!user) return res.sendStatus(404);

    const new_password = req.body.password;
    if (!new_password)
      return res.status(400).json({ message: "password field is required" });

    const hashed_password = await bcrypt.hash(new_password, 5);

    // modify the user password
    const new_user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        password: hashed_password,
      },
    });

    return res.status(200).json({message:"password changed successfully"});
  } catch (error) {
    console.log("[auth/change_password] error occured: ", error.message);
    return res.sendStatus(500);
  }
};
