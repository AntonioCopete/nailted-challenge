import { Router } from "express";
import { createEmployee, getEmployees } from "../controllers/employeeController";
const employeeRouter = Router();

// employeeRouter.get("/", () => console.log("test"));

employeeRouter.get("/", getEmployees);
employeeRouter.post("/", createEmployee);

export default employeeRouter;
