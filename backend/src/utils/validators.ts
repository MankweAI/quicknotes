export function validateRegister({ name, phone, password, role, grade }: any) {
  if (!name || !phone || !password || !role) return "Missing required fields";
  if (!["student", "teacher", "admin"].includes(role)) return "Invalid role";
  if (grade && (typeof grade !== "number" || grade < 1 || grade > 12))
    return "Invalid grade";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}

export function validateLogin({ phone, password }: any) {
  if (!phone || !password) return "Missing phone or password";
  return null;
}

