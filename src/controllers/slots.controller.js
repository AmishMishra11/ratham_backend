import { SessionModule } from "../modules/session.module";

const getStudentSlots = async (req, res) => {
  try {
    const sessions = await SessionModule.find({});

    if ((await sessions).length) {
      const openSessions = sessions.filter((item) => item.status === "Open");

      const validSessions = openSessions.filter(
        (item) => item.time > Date.now()
      );

      return res.status(200).json({ sessions: validSessions });
    } else {
      return res.status(404).json({ sessions: "No sessions found!" });
    }
  } catch (error) {
    return res.status(500).json({ sessions: "internal server error!", error });
  }
};

const bookSlots = async (req, res) => {
  try {
    const { studentID, studentName, sessionId } = req.body;

    const session = await SessionModule.findById({ _id: sessionId });

    if (session) {
      const newSessionDetails = {
        studentName,
        studentID,
        status: "Booked",
      };

      const updatedSession = await SessionModule.findByIdAndUpdate(
        {
          _id: sessionId,
        },
        newSessionDetails,
        { new: true }
      );

      return res
        .status(201)
        .json({ session: updatedSession, message: "Slot confirmed!" });
    } else {
      return res.status(404).json({ message: "No sessions found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!", error });
  }
};

const getDeanSlots = async (req, res) => {
  try {
    const sessions = await SessionModule.find({});

    if ((await sessions).length) {
      const bookedSessions = sessions.filter(
        (item) => item.status === "Booked"
      );

      const validSessions = bookedSessions.filter(
        (item) => item.time > Date.now()
      );

      res.status(200).json({ sessions: validSessions });
    } else {
      res.status(404).json({ message: "No Sessions found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

export { getStudentSlots, bookSlots, getDeanSlots };
