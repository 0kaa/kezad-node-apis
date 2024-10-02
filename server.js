const express = require("express");
const cors = require("cors"); // Import the cors middleware

const { KezadLayout } = require("./db"); // Import the KezadLayout model
const fs = require("fs"); // Import fs to handle file deletion
const { v4: uuidv4 } = require("uuid"); // Use UUID to generate unique IDs

const app = express();
const port = 5001;

app.use(cors()); // Use the cors middleware
app.use(express.json());

// Create a new KezadLayout entry
app.post("/kezadlayout", async (req, res) => {
  try {
    const { ScreenName, ActiveLayout } = req.body;

    // Create the KezadLayout entry
    const kezadLayoutEntry = await KezadLayout.create({
      id: uuidv4(), // Generate UUID for the ID
      ScreenName,
      ActiveLayout,
    });
    res.json(kezadLayoutEntry);
  } catch (err) {
    console.error("Error creating KezadLayout entry:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all KezadLayout entries
app.get("/kezadlayout", async (req, res) => {
  try {
    const kezadLayoutEntries = await KezadLayout.findAll();
    res.json(kezadLayoutEntries);
  } catch (err) {
    console.error("Error fetching KezadLayout entries:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get a specific KezadLayout entry by ScreenName
app.get("/kezadlayout/:screenName", async (req, res) => {
  try {
    const kezadLayoutEntry = await KezadLayout.findOne({
      where: { ScreenName: req.params.screenName },
    });
    if (kezadLayoutEntry) {
      res.json(kezadLayoutEntry);
    } else {
      res.status(404).send("KezadLayout entry not found");
    }
  } catch (err) {
    console.error("Error fetching KezadLayout entry:", err);
    res.status(500).send("Internal Server Error");
  }
});
// Update a KezadLayout entry by ScreenName
app.put("/kezadlayout/:screenName", async (req, res) => {
  try {
    const { ActiveLayout } = req.body;
    const { screenName } = req.params;

    // Ensure only 'WaveScreen' and 'customerTestimonials' can be updated
    if (screenName !== "WaveScreen" && screenName !== "customerTestimonials") {
      return res.status(400).send("Invalid ScreenName");
    }

    const [updated] = await KezadLayout.update(
      { ActiveLayout },
      { where: { ScreenName: screenName } }
    );

    if (updated) {
      const updatedKezadLayout = await KezadLayout.findOne({
        where: { ScreenName: screenName },
      });
      res.json(updatedKezadLayout);
    } else {
      res.status(404).send("KezadLayout entry not found");
    }
  } catch (err) {
    console.error("Error updating KezadLayout entry:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a KezadLayout entry by ScreenName
app.delete("/kezadlayout/:screenName", async (req, res) => {
  try {
    const deleted = await KezadLayout.destroy({
      where: { ScreenName: req.params.screenName },
    });
    if (deleted) {
      res.status(204).send("KezadLayout entry deleted");
    } else {
      res.status(404).send("KezadLayout entry not found");
    }
  } catch (err) {
    console.error("Error deleting KezadLayout entry:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
