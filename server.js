import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Schema (Flexible to accept any fields)
const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model("SheetData", DataSchema);

// POST route to update data
app.post("/update-data", async (req, res) => {
  const {category, subCategory}=req.body;
  console.log(req.body);
  console.log(category, subCategory);
  try {
    const deleted=await DataModel.deleteOne({category, subCategory});
    console.log(deleted);
    await DataModel.insertMany(req.body);
    res.json({ message: "Data inserted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// GET route to fetch data (for dashboard)
app.get("/data", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
