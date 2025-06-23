import express from "express";
import cors from "cors";
import "dotenv/config";
import bcrypt from "bcrypt";
import { connectAndSyncDB } from "./db.js";
import { users, tasks } from "./models.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./authMiddleware.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

connectAndSyncDB();

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404).json({ message: "Incorrect body format" });
  }
  console.log("Name : ", name, " email : ", email, " password : ", password);
  try {
    const alreadyExists = await users.findOne({ where: { name } });
    if (alreadyExists) {
      res.status(500).json({ message: "Email already exists, please Log in" });
      return;
    }
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    await users.create({ name, email, password: hashPassword });
    res.status(200).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(501).json({ message: "Internal Server Error" });
    console.log("Error is  : ", err);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const emailValid = await users.findOne({
    where: {
      email,
    },
  });
  if (!emailValid) {
    res.status(404).json({ message: "Email not found, please signup" });
    return;
  }
  const passwordCheck = await bcrypt.compare(password, emailValid.password);
  if (!passwordCheck) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }
  const token = await jwt.sign(
    { userId: emailValid.id },
    process.env.JWT_SECRET
  );
  res.status(200).json({ message: "Login successful", token });
});
app.get("/api/tasks", authMiddleware, async (req, res) => {
  try {
    const response = await tasks.findAll({
      where: {
        user_id: String(req.userId),
      },
    });
    // console.log("response is ; ", response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
});
app.post("/api/tasks", authMiddleware, async (req, res) => {
  const { title, status } = req.body;
  console.log(typeof req.userId);
  try {
    const response = await tasks.create({
      title,
      user_id: String(req.userId),
      status,
    });
    res.status(200).json({ message: "Created task successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("error posting task : ", err);
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  try {
    const response = await tasks.update(
      {
        title,
        status,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("error posting task : ", err);
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await tasks.destroy({
      where: { id },
    });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("error posting task : ", err);
  }
});

app.listen(PORT, () => {
  console.log("Server listening at Port : ", PORT);
});
