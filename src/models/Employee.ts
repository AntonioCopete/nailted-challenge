import fs from "fs";
interface IEmployee {
    id?: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    email: string;
    birthdate: string;
}

const Employee = {
    create: function ({ name, surname, address, phone, email, birthdate }: IEmployee) {
        // Getting the last employee id to create an employee with the next id
        const file = fs.readFileSync("./src/db/employees.txt");
        const textLines = file.toString().split("\n");
        const lastId = textLines[textLines.length - 1].split(",")[0];
        const newId = parseInt(lastId) + 1;

        // Sorting and formatting employee data before creating a new employee
        const newEmployee = { newId, name, surname, address, phone, email, birthdate };
        const stringEmployee: string = Object.values(newEmployee).join(",");

        fs.appendFileSync("./src/db/employees.txt", "\n" + stringEmployee);
    },
    find: function (page: string = "1", sort: string, filter: string) {
        const file = fs.readFileSync("./src/db/employees.txt");

        let employees: IEmployee[] = file
            .toString()
            .split("\n")
            .map((textLine) => {
                const employee = textLine.split(",");

                const [id, name, surname, address, phone, email, birthdate] = employee;

                return { id, name, surname, address, phone, email, birthdate };
            });

        if (filter) {
            employees = employees.filter((employee: IEmployee) => employee.email.includes(filter));
        }

        if (sort === "name" || sort === "surname") {
            console.log(sort);

            employees.sort((a: any, b: any) => a[sort].localeCompare(b[sort]));
        }

        employees = employees.slice(parseInt(page) * 5 - 5, parseInt(page) * 5);

        return employees;
    },
};

export default Employee;
