import vinylFtp from "vinyl-ftp";
import util from "gulp-util";
import dotenv from "dotenv";

dotenv.config();

export const ftp = vinylFtp.create({
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  parallel: 15,
  log: util.log,
});
