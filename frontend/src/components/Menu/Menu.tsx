import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <Link to="/">
                <Button className="">Dashboard</Button>
            </Link>
        </>
    );
};

export default Menu;
