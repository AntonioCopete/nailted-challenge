import { Router } from "express";
import { createEmployee, getEmployeeById, getEmployees } from "../controllers/employeeController";
import { validNewEmployee } from "../middlewares/validNewEmployee";
const employeeRouter = Router();

employeeRouter.get("/", getEmployees);
employeeRouter.get("/:id", getEmployeeById);
employeeRouter.post("/", validNewEmployee, createEmployee);

export default employeeRouter;
