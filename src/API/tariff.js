import axios from "axios";
import { dopPatch } from "../Utils/utils";

export const setTariff = async ({tariffId,token}) => {
    const formData = new FormData();
    formData.append("tariff_id", tariffId);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/settariff`,formData,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}

export const getArrTariff = async () => {
    const response = await axios.get(`http://localhost:80${dopPatch}/api/tariff`)
    return response.data;
}

export const getTariffId = async (id) => {
    const response = await axios.get(`http://localhost:80${dopPatch}/api/tariff/${id}`)
    return response.data;
}