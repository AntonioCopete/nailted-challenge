import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employee from "./pages/Employee/Employee";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="/employee=:id" element={<Employee />} />
            </Route>
        </Routes>
    );
}

export default App;
