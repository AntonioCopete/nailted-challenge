import { Button, Table as ReactTable } from "react-bootstrap";
import { Link } from "react-router-dom";

interface TableProps {
    columns: string[];
    rows: string[][];
}

const Table = ({ columns, rows }: TableProps) => {
    return (
        <ReactTable striped bordered hover className="text-center w-100">
            <thead>
                <tr>
                    {columns.map((column: string, idx: number) => {
                        return (
                            <th className="py-2" key={idx}>
                                {column}
                            </th>
                        );
                    })}
                    <th className="py-2"></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row: string[], idxr: number) => {
                    return (
                        <tr key={idxr}>
                            {row.map((value: string, idxv: number) => {
                                return (
                                    <td className="p-2 align-middle" key={idxv}>
                                        {value}
                                    </td>
                                );
                            })}
                            <td>
                                <Link to={`/employee=${row[0]}`}>
                                    <Button variant="primary">Show</Button>
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </ReactTable>
    );
};

export default Table;
