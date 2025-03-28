require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS (Update origin for frontend)
const corsOptions = {
  origin: ["http://localhost:3000", "https://yourfrontenddomain.com"], // Add frontend URL when deployed
  methods: "GET",
};
app.use(cors(corsOptions));

// Route to fetch product prices
app.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query)
    return res.status(400).json({ error: "Query parameter is required" });

  const options = {
    method: "GET",
    url: "https://pricer.p.rapidapi.com/str",
    params: { q: query },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Use environment variable
      "x-rapidapi-host": "pricer.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    console.log("This is my key", process.env.RAPIDAPI_KEY);
    res.status(500).json({ error: "Error fetching product data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
