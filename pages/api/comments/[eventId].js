import { getCommentsByEventId } from "../../../helpers/comments/api-utils";

/* async function commentByEventId(req, res) {
  const eventId = req.query.eventId;
  const comment = await getCommentsByEventId(eventId);
  res.status(200).json({ comments: comment });
}

export default commentByEventId;
 */

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const commentId = `${eventId}_${new Date().valueOf()}`;
    const newComment = { eventId: eventId, email, name, text };

    fetch(
      `https://nextjs-events-database-75dd8-default-rtdb.europe-west1.firebasedatabase.app/comments/${commentId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data.status === "Success");

    res.status(201).json({ success: true, comment: newComment });
  } else if (req.method === "GET") {
    const comment = await getCommentsByEventId(eventId);
    res.status(200).json({ success: true, comments: comment });
  }
}

export default handler;
