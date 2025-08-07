import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabaseClient";
import { validateRegister, validateLogin } from "../utils/validators";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const register = async (req: Request, res: Response) => {
  try {
    // Validate input
    const { name, phone, password, role, grade, school } = req.body;
    const error = validateRegister({ name, phone, password, role, grade });
    if (error) return res.status(400).json({ error });

    // Check if user exists
    const { data: existingUser, error: findError } = await supabase
      .from("User")
      .select("*")
      .eq("phone", phone)
      .single();

    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data, error: createError } = await supabase
      .from("User")
      .insert([
        {
          name,
          phone,
          password: hashedPassword,
          role,
          grade,
          school,
          registration_date: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (createError)
      return res.status(500).json({ error: createError.message });

    // Issue JWT
    const token = jwt.sign({ userId: data.id, role: data.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({ userId: data.id, token });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate input
    const { phone, password } = req.body;
    const error = validateLogin({ phone, password });
    if (error) return res.status(400).json({ error });

    // Find user
    const { data: user, error: findError } = await supabase
      .from("User")
      .select("*")
      .eq("phone", phone)
      .single();

    if (!user) return res.status(404).json({ error: "User not found" });

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // Issue JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ userId: user.id, token });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

