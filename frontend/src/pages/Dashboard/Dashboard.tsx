import { useEffect, useState } from "react";
import api from "../../api/api";
import Table from "../../components/Table/Table";

interface Employee {
    id: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    email: string;
    birthdate: string;
}

const Home = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const res = await api.fetchEmployees();

        if (res?.status === 200) setEmployees(res.data.employees);
    };
    return (
        <div>
            {employees.length > 0 && (
                <>
                    <Table
                        columns={Object.keys(employees[0])}
                        rows={employees.map((employeePropValues: Employee) => Object.values(employeePropValues))}
                    />
                    {/* <Table striped bordered hover>
                        <thead>
                            <tr>
                                {Object.keys(employees[0])?.map((employeePropName: string, idx: number) => {
                                    return <th key={idx}>{employeePropName}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employeePropValues: Employee, idx: number) => {
                                return (
                                    <tr key={idx}>
                                        {Object.values(employeePropValues).map(
                                            (employeePropValue: string, idx2: number) => {
                                                return <td key={idx2}>{employeePropValue}</td>;
                                            }
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table> */}
                </>
            )}
        </div>
    );
};

export default Home;
