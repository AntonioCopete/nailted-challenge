import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import IEmployee from "../../interfaces/Employee";

const Employee = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState<IEmployee>();
    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        if (employeeId) {
            const res = await api.fetchEmployee(parseInt(employeeId));
            console.log(res.data);

            if (res.status === 200) setEmployee(res.data.employee);
        }
    };
    return (
        <>
            <div>
                <Link to={"/"}>
                    <Button variant="secondary" className="my-4">
                        Back
                    </Button>
                </Link>
            </div>
            <div className="d-flex">
                {employee && (
                    <Card className="align-self-center w-100">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between align-items-center">
                                <h1>
                                    {employee.name} {employee.surname}
                                </h1>
                                <div className="text-muted">#{employee.id}</div>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{employee.email}</Card.Subtitle>
                            <div className="row">
                                <Card.Text className="col-md-4 col-sm-6 col-xs-12">
                                    Address: <span className="fw-bold"> {employee.address}</span>
                                </Card.Text>
                                <Card.Text className="col-md-4 col-sm-6 col-xs-12">
                                    Birth date: <span className="fw-bold">{employee.birth}</span>
                                </Card.Text>
                                <Card.Text className="col-md-4 col-sm-6 col-xs-12">
                                    Phone: <span className="fw-bold">{employee.phone}</span>
                                </Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    );
};

export default Employee;
