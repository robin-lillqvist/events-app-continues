import { useState, useEffect } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loadComments, setLoadComments] = useState(true);

  useEffect(() => {
    if (showComments && loadComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
        });
      setLoadComments(false);
    }
  }, [showComments, loadComments]);

  async function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSuccess(true));

    setLoadComments(true);
  }

  return (
    <section className={classes.comments}>
      <button className={classes.hideButton} onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !!comments && <CommentList comments={comments} />}
      {showComments && success && <p>Success sending comment</p>}
    </section>
  );
}

export default Comments;
