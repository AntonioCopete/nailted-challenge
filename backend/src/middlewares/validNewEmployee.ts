import { RequestHandler } from "express";
import Employee from "../models/Employee";

export const validNewEmployee: RequestHandler = async (req, res, next) => {
    const employeeValues = Object.values(req.body);
    const foundEmployees = Employee.find("1", "", req.body.email);

    const errors = [];

    if (foundEmployees.employees.length > 0) {
        errors.push("E-mail already exists");
    }
    console.log(employeeValues[0]);

    if (
        employeeValues.filter(
            (employeeValue: any, idx: number) =>
                employeeValue.includes(",") || employeeValue.includes("\n") || (idx !== 3 && employeeValue.includes("@"))
        ).length > 0
    ) {
        errors.push("Inputs shoudldn't include special characters");
    }

    if (errors.length > 0) {
        return res.status(400).json({ msg: "Error creating new employee", errors: errors });
    }

    next();
};
