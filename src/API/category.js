import axios from "axios";
import { dopPatch } from "../Utils/utils";

export const getCategory = async () => {
    const response = await axios.get(`http://localhost:80${dopPatch}/api/category`)
    return response.data;
}