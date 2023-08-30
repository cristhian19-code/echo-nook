import axios from 'axios'

const url = "http://localhost:5000/";

export const axiosInstance = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
})
