import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "invalid email adress" });
      return;
    } else {
      const client = await MongoClient.connect(
        "mongodb+srv://robinlillqvist:Bnt2iqgZxm3ecdMQ@cluster0.iemo3mj.mongodb.net/events?retryWrites=true&w=majority"
      );
      const db = client.db();
      await db.collection("newsletters").insertOne({ email: userEmail });

      client.close();

      res.status(201).json({ status: "Success", message: "Signed up" });
    }
  }
}

export default handler;
