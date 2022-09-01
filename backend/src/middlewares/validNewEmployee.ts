import { RequestHandler } from "express";
import IEmployee from "../interfaces/Employee";
import Employee from "../models/Employee";

export const validNewEmployee: RequestHandler = async (req, res, next) => {
    const { name, surname, address, phone, email, birth }: IEmployee = req.body;

    const employeeValues = Object.values(req.body);
    const foundEmployees = Employee.find("1", "", email);

    const errors = [];

    if (foundEmployees.employees.length > 0) {
        errors.push("E-mail already exists");
    }
    if (
        employeeValues.includes(",") ||
        employeeValues.includes("\n") ||
        name.includes("@") ||
        surname.includes("@") ||
        address?.includes("@") ||
        phone?.includes("@") ||
        email?.includes("@") ||
        birth?.includes("@")
    ) {
        errors.push("Inputs shoudldn't include special characters");
    }

    if (errors.length > 0) {
        return res.status(400).json({ msg: "Error creating new employee", errors: errors });
    }

    next();
};
