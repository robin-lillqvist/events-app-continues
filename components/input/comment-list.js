import classes from "./comment-list.module.css";

function CommentList(comments) {
  const commentsList = comments.comments;

  return (
    <ul className={classes.comments}>
      {commentsList.map((comment) => (
        <>
          <li>
            <p>My comment is amazing!</p>
            <div>
              By <address>Maximilian</address>
            </div>
          </li>
          <li>
            <p>My comment is amazing!</p>
            <div>
              By <address>Maximilian</address>
            </div>
          </li>
        </>
      ))}
    </ul>
  );
}

export default CommentList;
