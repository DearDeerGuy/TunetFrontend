import axios from "axios";
import { dopPatch } from "../Utils/utils";

export const getReviewsList = async ({film_id,perPage=10,page=null}) => {
    const params = {film_id,perPage};
    if (page) params.page = page;
    const response = await axios.get(`http://localhost:80${dopPatch}/api/reviews`,{params})
    return response.data;
}

export const getReviewUser = async ({film_id,user_id}) => {
    const params = {film_id,user_id,perPage:1};
    const response = await axios.get(`http://localhost:80${dopPatch}/api/reviews`,{params})
    return response.data.data.length > 0 ? response.data.data[0] : null;
}

export const addReview = async ({film_id,mark,comment},token) => {
    const formData = new FormData();
    formData.append("film_id", film_id);
    formData.append("mark", mark);
    formData.append("comment", comment);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/reviews`,formData,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}

export const updateReview = async (id,{mark,comment},token) => {
    const params = {mark,comment};
    const response = await axios.patch(`http://localhost:80${dopPatch}/api/reviews/${id}`,params,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}

export const deleteReview = async (id,token) => {
    const response = await axios.delete(`http://localhost:80${dopPatch}/api/reviews/${id}`,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}