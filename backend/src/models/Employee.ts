import fs from "fs";
import IEmployee from "../interfaces/Employee";

const Employee = {
    create: function ({ name, surname, address, phone, email, birth }: IEmployee) {
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
            birth,
        };
        const stringEmployee: string = Object.values(newEmployee).join(",");

        // Save employee in DB's next line
        fs.appendFileSync("./src/db/employees.txt", "\n" + stringEmployee);
    },
    find: function (page: string = "1", sort: string, filter: string) {
        const file = fs.readFileSync("./src/db/employees.txt");

        // Get every employee text line from DB
        let employeesText: string[] = file.toString().split("\n");

        // If we are using any email filter, filter DB employee wich contains the e-mail
        if (filter) {
            employeesText = employeesText.filter((employee: string) => employee.split(",")[5].toLowerCase().includes(filter.toLowerCase()));
        }

        // Sort employee lines by name (2nd property in DB) or surname (3rd property in DB)
        if (sort === "name" || sort === "surname") {
            employeesText.sort((a: string, b: string) => {
                const [aId, aName, aSurname] = a.split(",");
                const [bId, bName, bSurname] = b.split(",");

                if (sort === "name") {
                    return aName.localeCompare(bName);
                } else {
                    return aSurname.localeCompare(bSurname);
                }
            });
        }

        // Calculate number of pages needed to show employees if we are showing 5 employees per page
        const pages = employeesText.length % 5 === 0 ? employeesText.length / 5 : Math.trunc(employeesText.length / 5) + 1;

        // Get only 5 results per page
        employeesText = employeesText.slice(parseInt(page) * 5 - 5, parseInt(page) * 5);

        // Parse text data from DB to JSON
        const employees: IEmployee[] = employeesText.map((employee: string) => {
            const [id, name, surname, address, phone, email, birth] = employee.split(",");
            return {
                id,
                name,
                surname,
                email: email,
            };
        });

        return { employees, pages };
    },

    findById: function (id: string) {
        const fileArr = fs.readFileSync("./src/db/employees.txt").toString().split("\n");

        const foundLine = fileArr.find((fileLine: string) => fileLine.slice(0, id.length + 1) === id + ",");

        if (foundLine) {
            const employeeArr = foundLine.split(",");
            const [id, name, surname, address, phone, email, birth] = employeeArr;
            return {
                id,
                name,
                surname,
                address: address.slice(1, address.length - 1),
                phone,
                email: email,
                birth,
            };
        } else {
            return false;
        }
    },
};

export default Employee;
