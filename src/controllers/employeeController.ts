import { Request, RequestHandler, Response } from "express";
import Employee from "../models/Employee";
import { Query } from "express-serve-static-core";

interface IRequest<T extends Query> extends Request {
    query: T;
}

interface IQueryParams {
    [index: string]: string;
}

export const getEmployees = async (req: IRequest<IQueryParams>, res: Response) => {
    const { page, sort, filter }: IQueryParams = req.query;

    const employees = Employee.find(page, sort, filter);

    return res.status(200).json({ employees });
};

export const createEmployee = async (req: Request, res: Response) => {
    const { name, surname, address, phone, email, birthdate } = req.body;
    console.log(name);

    Employee.create({ name, surname, address, phone, email, birthdate });

    res.status(200).json({ msg: "Created" });
};
