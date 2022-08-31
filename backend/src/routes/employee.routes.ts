import { Router } from "express";
import { createEmployee, getEmployeeById, getEmployees } from "../controllers/employeeController";
const employeeRouter = Router();

employeeRouter.get("/", getEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", createEmployee);

export default employeeRouter;
