import { connectDatabase, insertDocument, getCommentsFromId } from "../../../helpers/database/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ success: false, message: "Connecting to the DB failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }
    const newComment = { eventId, email, name, text, date: new Date() };

    let insertResults;
    try {
      insertResults = await insertDocument(client, "comments", newComment);
      res.status(201).json({ success: true, message: "Added comment", comment: newComment, results: insertResults });
    } catch (error) {
      res.status(500).json({ success: false, message: "Inserting data failed", results: insertResults });
    }
  } else if (req.method === "GET") {
    const commentsFromId = await getCommentsFromId(client, "comments", eventId);
    res.status(200).json({ success: true, comments: commentsFromId });
  }
  client.close();
}

export default handler;
