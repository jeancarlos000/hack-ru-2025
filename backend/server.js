import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ---------- MongoDB Setup ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ---------- User Model ----------
import mongooseModule from "mongoose";
const { Schema, model } = mongooseModule;

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  picture: String,
}, { timestamps: true });

const User = model("User", userSchema);

// ---------- Google OAuth Setup ----------
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// Google Sign-In route
app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;

    // Find or create user in MongoDB
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = await User.create({ googleId: sub, name, email, picture });
    }

    // Create JWT for your app
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(400).json({ error: "Invalid Google token" });
  }
});

// ---------- Start server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
