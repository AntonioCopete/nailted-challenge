import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
const Layout = () => {
    return (
        <>
            <Header />
            <div className="d-flex">
                <aside className="col-2 pt-3">
                    <Menu />
                </aside>
                <main className="col-10 mx-auto">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Layout;
