import { postComment } from "../../../helpers/comments/api-utils";

async function comment(req, res) {
  if (req.method === "POST") {
    const response = await braPostComment(req.body);
    res.status(200).json({ newComment: response });
  }
}

export default comment;
