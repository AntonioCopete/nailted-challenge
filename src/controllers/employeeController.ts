import { RequestHandler } from "express";
import Employee from "../models/Employee";

export const getEmployees: RequestHandler = async (req, res) => {
    Employee.find();

    res.status(200).json({ msg: "DONE" });
};

export const createEmployee: RequestHandler = async (req, res) => {
    const { name, surname, address, phone, email, birthdate } = req.body;
    console.log(name);

    Employee.create({ name, surname, address, phone, email, birthdate });

    res.status(200).json({ msg: "Created" });
};
