const express = require("express");
const cors = require("cors");
const Transaction = require("./models/Transaction");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({ body: "Testing successful" });
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, price, description, dateTime } = req.body;
  const transaction = await Transaction.create({
    name,
    price,
    description,
    dateTime,
  });

  res.json(req.body);
});

app.get("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();

  res.json(transactions);
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
