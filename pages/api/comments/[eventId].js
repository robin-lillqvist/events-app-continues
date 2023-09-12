import { getCommentsByEventId } from "../../../helpers/comments/api-utils";

async function commentByEventId(req, res) {
  const eventId = req.query.eventId;
  const comment = await getCommentsByEventId(eventId);
  res.status(200).json({ comments: comment });
}

export default commentByEventId;
