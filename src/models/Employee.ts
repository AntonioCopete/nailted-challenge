import fs from "fs";
interface IEmployee {
    id?: number;
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
        const lastId = file.toString().split("\n")[file.toString().split("\n").length - 1].split(",")[0];
        const newId = parseInt(lastId) + 1;

        // Sorting and formatting employee data before creating a new employee
        const newEmployee = { newId, name, surname, address, phone, email, birthdate };
        const stringEmployee: string = Object.values(newEmployee).join(",");

        fs.appendFileSync("./src/db/employees.txt", "\n" + stringEmployee);
    },
    find: function () {
        const file = fs.readFileSync("./src/db/employees.txt");
        const dbEmployees = file.toString().split("\n");

        console.log(dbEmployees);
    },
};

export default Employee;
