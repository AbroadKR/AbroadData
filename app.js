import { connectDB } from "./database/database.js";

connectDB().then((client) => {
	console.log(client);
});
