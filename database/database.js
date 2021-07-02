import MongoDb from "mongodb";
import { config } from "../config.js";

export function connectDB() {
	return MongoDb.MongoClient.connect(config.db.host, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}
