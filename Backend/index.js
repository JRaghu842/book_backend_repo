const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { bookRoute } = require("./routes/book.routes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Working fine....... ");
});

app.use("/", bookRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server running on port ${process.env.port}`);
});
