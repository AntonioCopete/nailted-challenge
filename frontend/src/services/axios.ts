import axios, { HeadersDefaults } from "axios";

interface DefaultProperties extends HeadersDefaults {
    "Content-Type": string;
    Accept: string;
}

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:4000/api/v1";

axiosClient.defaults.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
} as DefaultProperties;

axiosClient.defaults.timeout = 2000;

export default axiosClient;
