import axios from "axios";
import {baseURL} from "../constants";

let axiosService = axios.create({baseURL});

export {
    axiosService
}