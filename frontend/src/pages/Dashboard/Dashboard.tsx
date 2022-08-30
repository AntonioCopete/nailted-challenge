import { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination } from "react-bootstrap";
import api from "../../api/api";
import Table from "../../components/Table/Table";
import Employee from "../../interfaces/Employee";

const Home = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [pages, setPages] = useState<Number[]>([]);
    const [showModal, setShowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState<string | null>(null);
    const [sort, setSort] = useState<string | null>(null);
    // useEffect(() => {
    //     loadEmployees();
    // }, []);

    useEffect(() => {
        console.log("CHANGE");

        loadEmployees(currentPage, search, sort);
    }, [currentPage, search, sort]);

    const loadEmployees = async (page: number = 1, search: string | null = null, sort: string | null = null) => {
        const res = await api.fetchEmployees(page, search, sort);

        if (res?.status === 200) {
            setEmployees(res.data.employees);

            const pageNumbers = res.data.pages;

            let pageTabs = [];
            for (let number = 1; number <= pageNumbers; number++) {
                pageTabs.push(number);
            }
            setPages(pageTabs);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const employeeData: Employee = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            address: e.target.address.value,
            email: e.target.email.value,
            birth: e.target.birth.value,
            phone: e.target.phone.value,
        };

        const res = await api.createEmployee(employeeData);

        if (res?.status === 201) loadEmployees();
    };

    const handlePage = (e: any) => {
        setCurrentPage(parseInt(e.target.textContent));
    };

    const handleSearch = (e: any) => {
        if (e.target.value) {
            setSearch(e.target.value);
            setCurrentPage(1);
        }
    };
    const handleSort = (e: any) => {
        if (e.target.value === "name" || e.target.value === "surname") {
            setSort(e.target.value);
            setCurrentPage(1);
        } else {
            setSort(null);
            setCurrentPage(1);
        }
    };

    return (
        <>
            <div className="container px-0 py-2">
                <div className="row m-0 p-0 justify-content-between">
                    <div className="col-5 p-0">
                        <Form.Control
                            onChange={handleSearch}
                            type="text"
                            id="search-email"
                            placeholder="Search email"
                        />
                    </div>
                    <div className="col-5 p-0">
                        <Form.Select onChange={handleSort} id="filter" defaultValue="title">
                            <option value="title" disabled>
                                Sort by
                            </option>
                            <option value="id">None</option>
                            <option value="name">Name</option>
                            <option value="surname">Surname</option>
                        </Form.Select>
                    </div>
                    <Button variant="success" className="col-1 p-0" onClick={() => setShowModal(true)}>
                        Add
                    </Button>
                </div>
            </div>

            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>New employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                        <Form.Control type="text" id="name" placeholder="Employee name" required />
                        <Form.Control type="text" id="surname" placeholder="Employee surname" required />
                        <Form.Control type="text" id="address" placeholder="Employee address" required />
                        <Form.Control type="email" id="email" placeholder="Employee email" required />
                        <Form.Control type="date" id="birth" placeholder="Employee birth date" required />
                        <Form.Control
                            type="tel"
                            id="phone"
                            placeholder="Employee phone"
                            minLength={10}
                            maxLength={10}
                            required
                        />
                        <div className="d-flex justify-content-end gap-3">
                            <Button variant="secondary">Cancel</Button>
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>

            {employees.length > 0 && (
                <>
                    <Table
                        columns={Object.keys(employees[0])}
                        rows={employees.map((employeePropValues: Employee) => Object.values(employeePropValues))}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            {pages.map((page, idx) => {
                                return (
                                    <Pagination.Item active={currentPage === idx + 1} onClick={handlePage} key={idx}>
                                        {page.toString()}
                                    </Pagination.Item>
                                );
                            })}
                        </Pagination>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
