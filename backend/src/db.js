import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.POSTGRES_URL_NON_POOLING, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
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
