import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { EmployeesContextProvider } from "./context/employeesContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <EmployeesContextProvider>
        <Router>
            <App />
        </Router>
    </EmployeesContextProvider>
);
