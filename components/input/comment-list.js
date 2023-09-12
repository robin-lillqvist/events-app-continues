import classes from "./comment-list.module.css";

function CommentList(comments) {
  const commentsList = comments.comments;

  return (
    <ul className={classes.comments}>
      {commentsList.map((comment) => (
        <li key={comment.id}>
          <p>{comment.value}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
