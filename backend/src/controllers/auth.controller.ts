import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

const prisma = new PrismaClient();

// ==================== Register ====================
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// ==================== Login ====================
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials, no user found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// ==================== Update Profile ====================
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { userId, name, prevPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const updatedData: any = { name };

    if (newPassword && newPassword.trim().length > 0) {
      if (!prevPassword) {
        res.status(400).json({ success: false, message: "Previous password required to set new password" });
        return;
      }

      const isMatch = await bcrypt.compare(prevPassword, user.password);
      if (!isMatch) {
        res.status(401).json({ success: false, message: "Incorrect previous password" });
        return;
      }

      updatedData.password = await bcrypt.hash(newPassword, 10);
    }

    // console.log("Updating user:", userId, updatedData);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    // console.log("UserId:", userId, typeof userId)

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    // console.log("Update Error: ", error)
    res.status(500).json({ success: false, message: "Update failed", error });
  }
};


export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User with this email does not exist" });
      return;
    }

    // Generate a temporary random password (8 characters)
    const tempPassword = crypto.randomBytes(4).toString("hex");

    // Hash it before storing
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Send email with temporary password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your App Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Temporary Password",
      text: `Hello ${user.name},\n\nYour temporary password is: ${tempPassword}\n\nPlease log in and change your password immediately.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Temporary password sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Failed to send temporary password", error });
  }
};
