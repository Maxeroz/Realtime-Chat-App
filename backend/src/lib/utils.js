import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней в миллисекундах
    httpOnly: true, // Куки доступны только на сервере
    sameSite: "strict", // Защита от CSRF-атак
    secure: process.env.NODE_ENV !== "development", // Куки передаются только по HTTPS (кроме режима разработки)
  });

  return token;
};
