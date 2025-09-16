import axios from "axios"
import { dopPatch } from "../Utils/utils";

export const getFavoriteList = async ({per_page=5,page=null,search=null,type=null,categories=null},token) => {
    const params = {per_page,of:'rating',ot:'desc'};
    if (page) params.page = page;
    if (search) params.search = search;
    if (type) params.type = type;
    if (categories) params.categories = categories;
    const response = await axios.get(`http://localhost:80${dopPatch}/api/favorite`,{params,headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}

export const addFavorite = async (filmId,token) => {
    const response = await axios.post(`http://localhost:80${dopPatch}/api/favorite`,{ film_id: filmId },{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}

export const deleteFavorite = async (filmId,token) => {
    const response = await axios.delete(`http://localhost:80${dopPatch}/api/favorite/${filmId}`,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}
