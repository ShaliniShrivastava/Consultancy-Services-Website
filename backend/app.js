const env = require("dotenv");
env.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB");
const web = require("./routes/web");
const app = express();
const path = require("path");
const port = 3000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://consultancy-services-website.vercel.app",
    ],
    credentials: true,
  }),
);

app.use("/api", web);

connectDB();

(app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
}),
  (module.exports = app));
