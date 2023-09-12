import { MongoClient } from "mongodb";
import { getCommentsByEventId } from "../../../helpers/comments/api-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://robinlillqvist:Bnt2iqgZxm3ecdMQ@cluster0.iemo3mj.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const newComment = { eventId, email, name, text };

    const db = client.db();
    const results = await db.collection("comments").insertOne(newComment);
    console.log(results.insertedId);

    res.status(201).json({ success: true, message: "Added comment", comment: newComment });
  } else if (req.method === "GET") {
    const comment = await getCommentsByEventId(eventId);
    res.status(200).json({ success: true, comments: comment });
  }

  client.close();
}

export default handler;
