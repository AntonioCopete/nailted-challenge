import axiosClient from "../services/axios";

export default {
    fetchEmployees: async (page: number = 1) => {
        const res = await axiosClient.get("/employees");
        return res;
    },

    createEmployee: async (employee: any) => {
        const res = await axiosClient.post("/employees", employee);
        return res;
    },
};
