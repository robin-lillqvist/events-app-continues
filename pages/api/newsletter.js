import { useReducer } from "react";

function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "invalid email adress" });
      return;
    }
  }
}

export default handler;
