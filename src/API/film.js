import axios from "axios";
import { dopPatch } from "../Utils/utils";

export const addMovie = async({posterFile,title,description,release_date,type,actors,producer,country,category},token) =>{
    const formData = new FormData();
    formData.append("poster", posterFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("release_date", release_date);
    formData.append("type", type);
    formData.append("actors", actors);
    formData.append("producer", producer);
    formData.append("country", country);
    formData.append("category", category.join(','));
    const response = await axios.post(`http://localhost:80${dopPatch}/api/film`,formData,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}

export const updateMovie = async(id,{posterFile,title,description,release_date,type,actors,producer,country,category},token) =>{
    const formData = new FormData();
    if(posterFile!=null){
        formData.append("poster", posterFile);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("release_date", release_date);
    formData.append("type", type);
    formData.append("actors", actors);
    formData.append("producer", producer);
    formData.append("country", country);
    formData.append("category", category);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/film/${id}`,formData,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}

export const getMovieList = async ({per_page=5,page=null,search=null,type=null,categories=null}) => {
    const params = {per_page};
    if (page) params.page = page;
    if (search) params.search = search;
    if (type) params.type = type;
    if (categories) params.categories = categories;
    const response = await axios.get(`http://localhost:80${dopPatch}/api/film`,{params})
    return response.data;
}

export const getMovieById = async (id)=>{
    const response = await axios.get(`http://localhost:80${dopPatch}/api/film/${id}`)
    return response.data;
}

export const deleteMovie = async (id,token) => {
    const response = await axios.delete(`http://localhost:80${dopPatch}/api/film/${id}`,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}