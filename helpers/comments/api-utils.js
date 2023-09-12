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

export async function getCommentsByEventId(activeEventId) {
  const allComments = await getAllComments();
  const filteredComment = allComments.filter((event) => event.eventId === activeEventId);
  return filteredComment;
}

export async function postComment(body) {
  const { email, name, message } = body;

  const newComment = { status: "success", email: email, name: name, message: message };
  return newComment;
}

async function braPostComment(req) {
  console.log(req);

  const testData = {
    email: "robin.lillqvist@knowit.se",
    name: "Robin Lillqvist",
    message: "This is a comment apparently...",
  };

  if (req.method === "POST") {
    fetch("https://nextjs-events-database-75dd8-default-rtdb.europe-west1.firebasedatabase.app/comments.json", {
      method: "POST",
      body: JSON.stringify(testData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data.status === "Success");

    console.log(response);
    res.status(200).json({ newComment: response });
  }
  return newComment;
}

async function comment(req, res) {
  if (req.method === "POST") {
    const response = await postComment(req.body);
    console.log(response);
    res.status(200).json({ newComment: response });
  }
}
