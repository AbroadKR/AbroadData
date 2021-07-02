import dotenv from "dotenv";
dotenv.config();

export const config = {
	db: {
		host: process.env["DB_HOST"],
	},
};
