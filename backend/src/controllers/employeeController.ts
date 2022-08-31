import { Request, Response } from "express";
import Employee from "../models/Employee";
import { Query } from "express-serve-static-core";

interface IRequest<T extends Query> extends Request {
    query: T;
}

interface IQueryParams {
    [index: string]: string;
}

export const getEmployees = async (req: IRequest<IQueryParams>, res: Response) => {
    const { page, sort, filter } = req.query;

    const { employees, pages } = Employee.find(page, sort, filter);

    return res.status(200).json({ employees, pages });
};

export const createEmployee = async (req: Request, res: Response) => {
    const { name, surname, address, phone, email, birth } = req.body;

    Employee.create({ name, surname, address, phone, email, birth });

    res.status(201).json({ msg: "Created" });
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const employee = Employee.findById(req.params.id);

    return res.status(200).json({ employee });
};
