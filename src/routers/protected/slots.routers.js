import express from "express";

import {
  getStudentSlots,
  bookSlots,
  getDeanSlots,
} from "../../controllers/slots.controller";

const router = express.Router();

router.route("/student").get(getStudentSlots);
router.route("/book").post(bookSlots);
router.route("/dean").get(getDeanSlots);

export { router };
