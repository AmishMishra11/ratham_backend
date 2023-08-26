import mongoose from "mongoose";

const { Schema } = mongoose;

const uesrSchema = new Schema({
  name: String,
  universityID: String,
  password: String,
});

const StudentModule = mongoose.model("Students", uesrSchema);
const DeanModule = mongoose.model("Deans", uesrSchema);

export { uesrSchema, StudentModule, DeanModule };
