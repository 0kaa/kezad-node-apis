require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Use UUID to generate unique IDs
// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

// Define a model for RFID
const KezadLayout = sequelize.define(
  "KezadLayout",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ScreenName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ActiveLayout: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);
// Function to seed the database if empty
const seedDatabase = async () => {
  const count = await KezadLayout.count();
  if (count === 0) {
    console.log("Database is empty. Seeding...");
    await KezadLayout.bulkCreate([
      {
        id: uuidv4(),
        ScreenName: "WaveScreen",
        ActiveLayout: "Default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        ScreenName: "CustomerTestimonials",
        ActiveLayout: "Default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log("Database seeded successfully.");
  } else {
    console.log("Database is not empty. No seeding needed.");
  }
};

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("KezadLayout table has been synced.");
    seedDatabase();
  })
  .catch((err) => console.error("Unable to sync the database:", err));

module.exports = {
  sequelize,
  KezadLayout,
};
