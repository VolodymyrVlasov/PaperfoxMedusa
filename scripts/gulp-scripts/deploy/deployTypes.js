import dotenv from "dotenv";

dotenv.config();

export const DeployTypes = {
  LOCAL_SERVER: process.env.LOCAL_SERVER,
  REMOTE_SERVER: process.env.REMOTE_SERVER,
  PROD_SERVER: process.env.PROD_SERVER,
};