import jwt from "jsonwebtoken";

const authVerify = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "unauthorized!" });

  try {
    const tempToken = token.split(" ")[1];
    jwt.verify(tempToken, process.env.TOKEN_SECRET);
    return next();
  } catch (e) {
    console.log("error occured", e);
    return res.status(401).json({ message: "unauthorized!" });
  }
};

export { authVerify };
