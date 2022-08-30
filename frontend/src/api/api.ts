import axiosClient from "../services/axios";

export default {
    fetchEmployees: async (page: number | null = 1, filter: string | null = null, sort: string | null = null) => {
        let url = `/employees?page=${page}`;
        if (filter) url += `&filter=${filter}`;
        if (sort) url = url + `&sort=${sort}`;
        const res = await axiosClient.get(url);
        return res;
    },

    createEmployee: async (employee: any) => {
        const res = await axiosClient.post("/employees", employee);
        return res;
    },
};
