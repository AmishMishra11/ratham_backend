import mongoose from "mongoose";

const { Schema } = mongoose;

const sessionSchema = new Schema({
  status: String,
  time: Date,
  studentID: String,
  studentname: String,
  deanID: String,
  deanName: String,
});

const SessionModule = mongoose.model("Sessions", sessionSchema);

export { sessionSchema, SessionModule };
