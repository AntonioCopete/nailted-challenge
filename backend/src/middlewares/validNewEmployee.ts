import { RequestHandler } from "express";
import Employee from "../models/Employee";

export const validNewEmployee: RequestHandler = (req, res, next) => {
    try {
        const employeeValues = Object.values(req.body);
        const foundEmployees = Employee.find("1", "", req.body.email);

        const errors = [];

        if (foundEmployees.employees.length > 0) {
            errors.push("E-mail already exists");
        }

        // Make sure users can't save data with characters such as "," or "\n" since it's how we recognize different employees or employee's properties in the database
        if (employeeValues.filter((employeeValue: any, idx: number) => employeeValue.includes(",") || employeeValue.includes("\n") || (idx !== 3 && employeeValue.includes("@"))).length > 0) {
            errors.push("Inputs shoudldn't include special characters");
        }

        if (errors.length > 0) {
            return res.status(400).json({ msg: "Error creating new employee", errors: errors });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Unexpected error" });
    }
};
