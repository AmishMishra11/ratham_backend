import { StudentModule, DeanModule } from "../modules/user.module";

import jwt from "jsonwebtoken";

const studentLogin = async (req, res) => {
  try {
    const { universityID, password } = req.body;

    const foundUser = await StudentModule.findOne({
      universityID: universityID,
    }).exec();

    const checkCorrectUser = await StudentModule.findOne({
      universityID: universityID,
      password: password,
    }).exec();

    if (foundUser) {
      if (checkCorrectUser) {
        console.log("here");
        const token = jwt.sign({ universityID }, process.env.TOKEN_SECRET);

        const bearerToken = "bearer " + token;
        res.status(200).json({ foundUser, encodedToken: bearerToken });
      } else {
        res.status(401).json({ message: "password incorrect!" });
      }
    } else {
      res.status(404).json({ message: "user not found!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const deanLogin = async (req, res) => {
  try {
    const { universityID, password } = req.body;

    const foundUser = await DeanModule.findOne({
      universityID: universityID,
    }).exec();

    const checkCorrectUser = await DeanModule.findOne({
      universityID: universityID,
      password: password,
    }).exec();

    if (foundUser) {
      if (checkCorrectUser) {
        const token = jwt.sign({ universityID }, process.env.TOKEN_SECRET);
        const bearerToken = "bearer " + token;

        res.status(200).json({ foundUser, encodedToken: bearerToken });
      } else {
        res.status(401).json({ message: "password incorrect!" });
      }
    } else {
      res.status(404).json({ message: "dean not found!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export { studentLogin, deanLogin };
