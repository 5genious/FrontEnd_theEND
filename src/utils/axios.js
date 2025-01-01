import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:8087",
});

export default customFetch;
