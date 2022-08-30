import fs from "fs";
interface IEmployee {
    id?: string;
    name: string;
    surname: string;
    address?: string;
    phone?: string;
    email: string;
    birthdate?: string;
}

const Employee = {
    create: function ({ name, surname, address, phone, email, birthdate }: IEmployee) {
        // Getting the last employee id to create an employee with the next id
        const file = fs.readFileSync("./src/db/employees.txt");
        const textLines = file.toString().split("\n");
        const lastId = textLines[textLines.length - 1].split(",")[0];
        const newId = parseInt(lastId) + 1;

        // Sorting and formatting employee data before creating a new employee
        const newEmployee = {
            newId,
            name,
            surname,
            address: '"' + address + '"',
            phone: phone?.slice(0, 3) + "-" + phone?.slice(3, 6) + "-" + phone?.slice(6),
            email,
            birthdate,
        };
        const stringEmployee: string = Object.values(newEmployee).join(",");

        fs.appendFileSync("./src/db/employees.txt", "\n" + stringEmployee);
    },
    find: function (page: string = "1", sort: string, filter: string) {
        let employees: IEmployee[] = this.findAll();

        if (filter) {
            employees = employees.filter((employee: IEmployee) => employee.email.includes(filter));
        }

        if (sort === "name" || sort === "surname") {
            employees.sort((a: IEmployee, b: IEmployee) => a[sort].localeCompare(b[sort]));
        }

        const pages = Math.trunc(employees.length / 5);

        employees = employees.slice(parseInt(page) * 5 - 5, parseInt(page) * 5);

        return { employees, pages };
    },

    findById: function (id: string) {
        const fileArr = fs.readFileSync("./src/db/employees.txt").toString().split("\n");

        const foundLine = fileArr.find((fileLine: any) => fileLine.slice(0, id.length) === id);

        if (foundLine) {
            const [id, name, surname, address, phone, email, birthdate] = foundLine;
            return {
                id,
                name,
                surname,
                address: address.slice(1, address.length - 1),
                phone,
                email: email.toLowerCase(),
                birthdate,
            };
        } else {
            return false;
        }
    },

    findAll: function () {
        const file = fs.readFileSync("./src/db/employees.txt");

        return file
            .toString()
            .split("\n")
            .map((textLine: string) => {
                const employeeLine = textLine.split(",");

                const [id, name, surname, address, phone, email, birthdate] = employeeLine;

                return {
                    id,
                    name,
                    surname,
                    email: email.toLowerCase(),
                };
            });
    },
};

export default Employee;
