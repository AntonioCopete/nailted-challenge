import axiosClient from "../services/axios";

export default {
    fetchEmployees: async () => {
        const res = await axiosClient.get("/employees");
        return res;
    },
};
