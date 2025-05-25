const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const profile = require("./routes/profile");
const user = require("./routes/user");
const formdata = require("./routes/formdata");
const multer = require("multer");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Use CORS middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "UPDATE", "DELETE"],
  })
);

app.use(express.json());

// Connect to the database
const dbConnect = require("./config/database");
dbConnect();

// Parse URL-encoded data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const Product = require("./models/Product");
// Import and mount routes
app.use("/", user);
app.use("/upload", formdata);
app.use("/home", profile);
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server started at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});