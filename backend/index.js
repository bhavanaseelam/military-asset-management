const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ Database Connection Error:", err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend + Database is working");
});

// ✅ PURCHASE MODEL
const Purchase = mongoose.model("Purchase", {
  assetName: String,
  base: String,
  quantity: Number
});

// ✅ ADD PURCHASE
app.post("/add", async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    res.json({ message: "Purchase Added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET PURCHASES
app.get("/get", async (req, res) => {
  const data = await Purchase.find();
  res.json(data);
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    await Purchase.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});