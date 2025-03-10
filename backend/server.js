const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoose_URI = "mongodb+srv://<db_username>:<db_password>@deployment-demo.gkrup.mongodb.net/?retryWrites=true&w=majority&appName=deployment-demo"
const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(5000, '0.0.0.0', () => {
    console.log("Server running on port 5000");
});


// 🔹 Connect to MongoDB
mongoose.connect(mongoose_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🔹 Define Schema & Model
const DataSchema = new mongoose.Schema({
    content: String
});
const DataModel = mongoose.model("Data", DataSchema);

// 🔹 Store data in MongoDB
app.post("/submit", async (req, res) => {
    try {
        const newData = new DataModel({ content: req.body.data });
        await newData.save();
        res.json({ message: "Data stored in MongoDB!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data" });
    }
});

// 🔹 Retrieve stored data from MongoDB
app.get("/data", async (req, res) => {
    try {
        const storedData = await DataModel.find();
        res.json({ storedData });
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

// 🔹 Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
