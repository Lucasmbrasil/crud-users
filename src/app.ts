import "reflect-metadata";
import express from "express";
import router from "./routes";
// import router from "./routes";
// import { globalError } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use(router);

app.use(express.json());
// app.use(router);
// app.use(globalError);

export default app;
