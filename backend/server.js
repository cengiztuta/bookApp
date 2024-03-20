const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const userRoutes = require("./routes/userRoutes");
module.exports = app;
app.use(
  cors({
    exposedHeaders: "Content-Range",
  })
);
const PORT = 3000;
app.use("/", userRoutes);
mongoose
  .connect(
    "mongodb+srv://tutacengiz:123456asd@cluster0.kol6gnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log("Server Started on 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("<h1>asd</h1>");
});
