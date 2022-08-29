import express from "express";
import employeeRouter from "./routes/employee.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Define api endpoints for Employee model
app.use("/employees", employeeRouter);

export default app;
