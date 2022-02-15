import axios from "axios";
import "reflect-metadata";
import app from "./app";
import { connectDatabase } from "./database";

connectDatabase();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}/`);
});
