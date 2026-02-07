import axios from "axios";

const newRequest = axios.create({
    // baseURL: "http://localhost:8800/api/",
    baseURL: "https://codehunt-freelancer-hub-platform.onrender.com/api/",
    withCredentials:true,
});

export default newRequest;