import express from "express";

import { studentLogin, deanLogin } from "../../controllers/auth.controller";

const router = express.Router();

router.route("/studentLogin").post(studentLogin);
router.route("/deanLogin").post(deanLogin);

export { router };
