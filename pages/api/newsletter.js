function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "invalid email adress" });
      return;
    } else {
      res.status(201).json({ status: "Success", message: "Signed up" });
    }
  }
}

export default handler;
