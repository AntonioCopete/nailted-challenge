import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <Link to="/">
                <div className="ps-2 fw-bold">Dashboard</div>
            </Link>
        </>
    );
};

export default Menu;
