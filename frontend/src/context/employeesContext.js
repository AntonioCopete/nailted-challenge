import { createContext, useContext, useReducer } from "react";

const initialState = {
    employees: [],
};

const EmployeesContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_EMPLOYEES":
            return {
                ...state,
                employees: action.payload,
            };

        default:
            return state;
    }
};

const EmployeesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const EmployeeStates = {
        ...state,
        loadEmployees: (employees) => dispatch({ type: "LOAD_EMPLOYEES", payload: employees }),
    };

    return <EmployeesContext.Provider value={EmployeeStates}>{children}</EmployeesContext.Provider>;
};

const useEmployees = () => {
    return useContext(EmployeesContext);
};

export { EmployeesContextProvider, useEmployees };
