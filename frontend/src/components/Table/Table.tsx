import { Table as ReactTable } from "react-bootstrap";

interface TableProps {
    columns: string[];
    rows: string[][];
}

const Table = ({ columns, rows }: TableProps) => {
    return (
        <ReactTable striped bordered hover>
            <thead>
                <tr>
                    {columns.map((column: string, idx: number) => {
                        return <th key={idx}>{column}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {rows.map((row: any, idxr: number) => {
                    return (
                        <tr key={idxr}>
                            {row.map((value: any, idxv: number) => {
                                return <td key={idxv}>{value}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </ReactTable>
    );
};

export default Table;
