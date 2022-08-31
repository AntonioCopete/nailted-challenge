import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
const Layout = () => {
    return (
        <>
            <Header />
            {/* <Menu /> */}
            <main className="container">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
