const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT
const generateToken = (userId) => {
      return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
      });
};

// Cookie options (reuse)
const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" // use lax for local dev
};

// ================= SIGNUP =================
exports.signup = async (req, res) => {
      try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                  return res.status(400).json({
                        success: false,
                        message: "All fields are required",
                        data: {}
                  });
            }

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                  return res.status(400).json({
                        success: false,
                        message: "User already exists",
                        data: {}
                  });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                  name,
                  email,
                  password: hashedPassword
            });

            const token = generateToken(user._id);

            res.cookie("token", token, cookieOptions);

            return res.status(201).json({
                  success: true,
                  message: "User registered successfully",
                  data: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                  }
            });

      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: "Signup failed",
                  data: {}
            });
      }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
      try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid credentials",
                        data: {}
                  });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid credentials",
                        data: {}
                  });
            }

            const token = generateToken(user._id);

            res.cookie("token", token, cookieOptions);

            return res.status(200).json({
                  success: true,
                  message: "Login successful",
                  data: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                  }
            });

      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: "Login failed",
                  data: {}
            });
      }
};

// ================= LOGOUT =================
exports.logout = (req, res) => {
      res.clearCookie("token", cookieOptions);

      return res.status(200).json({
            success: true,
            message: "Logged out successfully",
            data: {}
      });
};