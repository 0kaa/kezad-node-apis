const express = require("express");
const cors = require("cors");
const { connectToDatabase, sql } = require("./db");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Create a new KezadLayout entry
app.post("/kezadlayout", async (req, res) => {
  try {
    const { ScreenName, ActiveLayout } = req.body;

    await connectToDatabase();
    const query = `
      INSERT INTO KezadLayout (id, ScreenName, ActiveLayout, createdAt, updatedAt)
      VALUES (@id, @ScreenName, @ActiveLayout, GETDATE(), GETDATE())
    `;
    await sql.query(query, {
      id: { type: sql.UniqueIdentifier, value: uuidv4() },
      ScreenName: { type: sql.VarChar, value: ScreenName },
      ActiveLayout: { type: sql.VarChar, value: ActiveLayout },
    });
    res.json({ message: "KezadLayout entry created successfully" });
  } catch (err) {
    console.error("Error creating KezadLayout entry:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all KezadLayout entries
app.get("/kezadlayout", async (req, res) => {
  try {
    await connectToDatabase();
    const result = await sql.query("SELECT * FROM KezadLayout");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching KezadLayout entries:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Get a specific KezadLayout entry by ScreenName
app.get("/kezadlayout/:screenName", async (req, res) => {
  try {
    await connectToDatabase();
    const result = await sql.query(
      `
      SELECT * FROM KezadLayout WHERE ScreenName = @ScreenName
    `,
      {
        ScreenName: { type: sql.VarChar, value: req.params.screenName },
      }
    );

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
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

    if (screenName !== "WaveScreen" && screenName !== "CustomerTestimonials") {
      return res.status(400).send("Invalid ScreenName");
    }

    await connectToDatabase();
    const result = await sql.query(
      `
      UPDATE KezadLayout SET ActiveLayout = @ActiveLayout WHERE ScreenName = @ScreenName
    `,
      {
        ActiveLayout: { type: sql.VarChar, value: ActiveLayout },
        ScreenName: { type: sql.VarChar, value: screenName },
      }
    );

    if (result.rowsAffected[0] > 0) {
      const updatedResult = await sql.query(
        `
        SELECT * FROM KezadLayout WHERE ScreenName = @ScreenName
      `,
        {
          ScreenName: { type: sql.VarChar, value: screenName },
        }
      );
      res.json(updatedResult.recordset[0]);
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
    await connectToDatabase();
    const result = await sql.query(
      `
      DELETE FROM KezadLayout WHERE ScreenName = @ScreenName
    `,
      {
        ScreenName: { type: sql.VarChar, value: req.params.screenName },
      }
    );

    if (result.rowsAffected[0] > 0) {
      res.status(204).send("KezadLayout entry deleted");
    } else {
      res.status(404).send("KezadLayout entry not found");
    }
  } catch (err) {
    console.error("Error deleting KezadLayout entry:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectToDatabase();
});
