import { connectDatabase, insertDocument } from "../../helpers/database/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    let client;
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "invalid email adress" });
      return;
    }

    try {
      client = await connectDatabase();
    } catch (error) {
      console.log(error);
      res.status(500).json({ Success: false, message: "DB connection failed" });
      return;
    }

    let insertResults;
    try {
      insertResults = await insertDocument(client, "newsletters", { email: userEmail });
    } catch (error) {
      console.log(error);
      res.status(500).json({ Success: false, message: "Insert document failed" });
      return;
    }

    client.close();

    res.status(201).json({ status: "Success", message: "Signed up" });
  }
}

export default handler;
