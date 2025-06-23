import { Sequelize } from "sequelize";
import "dotenv/config";
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);
const connectAndSyncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync();
    console.log("Database Synced Successfully");
  } catch (err) {
    console.log("Error connecting and syncing to db : ", err);
  }
};

export { sequelize, connectAndSyncDB };
