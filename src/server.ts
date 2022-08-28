import express from "express";
import employeeRouter from "./routes/employee.routes";

const app = express();

app.use(express.json());

// Define api endpoints for Employee model
app.use("/employees", employeeRouter);

export default app;
