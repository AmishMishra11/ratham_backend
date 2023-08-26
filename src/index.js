import express, { urlencoded } from "express";
import { connectToMongoose } from "./db/db.connect";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ extended: true }));

connectToMongoose();

const port = process.env.port || 3000;

import { router as authRouter } from "./routers/public/auth.routers";
import { router as slotRouter } from "./routers/protected/slots.routers";

import { authVerify } from "./middleware/authVerify";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/slots", authVerify, slotRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
