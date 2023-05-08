import jwt, { decode } from "jsonwebtoken";
import env from "dotenv";
import User from "../models/user";
env.config();

const handelRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.send({ error: "Invalid!" });

  const refreshToken = cookies.jwt;

  const user = User.findOne({ refreshToken });
  if (!user) return res.send({ error: "Invalid!" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err || user.email !== decode.email)
      return res.send({ error: "Invalid!" });
    const accessToken = jwt.sign(
      { email: decode.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken: accessToken });
  });
};

export default handelRefreshToken;
