import { Request, Response } from "express";
import Employee from "../models/Employee";
import { Query } from "express-serve-static-core";
import IEmployee from "../interfaces/Employee";

interface IRequest<T extends Query> extends Request {
    query: T;
}

interface IQueryParams {
    [index: string]: string;
}

export const getEmployees = (req: IRequest<IQueryParams>, res: Response) => {
    try {
        const { page, sort, filter } = req.query;

        const foundEmployees = Employee.find(page, sort, filter);

        return res.status(200).json({ employees: foundEmployees.employees, pages: foundEmployees.pages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Unexpected error" });
    }
};

export const createEmployee = (req: Request, res: Response) => {
    try {
        const { name, surname, address, phone, email, birth }: IEmployee = req.body;

        Employee.create({ name, surname, address, phone, email, birth });

        return res.status(201).json({ msg: "Created" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Unexpected error" });
    }
};

export const getEmployeeById = (req: Request, res: Response) => {
    try {
        const foundEmployee = Employee.findById(req.params.id);
        if (foundEmployee) return res.status(200).json({ foundEmployee });
        return res.status(400).json({ msg: "Employee not found" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Unexpected error" });
    }
};
