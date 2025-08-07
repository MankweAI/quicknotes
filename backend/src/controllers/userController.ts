import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";

export const getProfile = async (req: Request, res: Response) => {
  const { user } = req as any;
  const { data, error } = await supabase
    .from("User")
    .select("id, name, phone, role, grade, school")
    .eq("id", user.userId)
    .single();

  if (error || !data) return res.status(404).json({ error: "User not found" });
  return res.status(200).json(data);
};

