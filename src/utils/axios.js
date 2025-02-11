import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://gsincident.onrender.com/",
});

export default customFetch;
