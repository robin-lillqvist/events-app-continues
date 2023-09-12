export async function getAllComments() {
  const response = await fetch(
    "https://nextjs-events-database-75dd8-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
  );
  const data = await response.json();
  const comments = [];

  for (const key in data) {
    comments.push({
      id: key,
      ...data[key],
    });
  }

  return comments;
}

export async function getCommentsByEventId(id) {
  const allComments = await getAllComments();
  const filteredComment = allComments.filter((event) => event.eventId === id);
  return filteredComment;
}
