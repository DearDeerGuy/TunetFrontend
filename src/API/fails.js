import axios from "axios";
import { dopPatch } from "../Utils/utils";

export const getVideoStream = async (link,token) => {
    const response = await axios.get(`http://localhost:80${dopPatch}/api/stream/a.mp4?path=${link}`,
        {headers: {
            Authorization:`Bearer ${token}`,},
            responseType: "blob",
        }
    );
    return URL.createObjectURL(response.data);
}

export const getFileById = async (film_id,token) => {
    const response = await axios.get(`http://localhost:80${dopPatch}/api/file?film_id=${film_id}`,{headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

export const addFailFilm = async (film_id,{file},token) => {
    const formData = new FormData();
    formData.append("film_id", film_id);
    formData.append("file", file);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/file`,formData,{headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

export const addFailSerial = async (film_id,{file,season_number,episode_number},token) => {
    const formData = new FormData();
    formData.append("film_id", film_id);
    formData.append("file", file);
    formData.append("season_number", season_number);
    formData.append("episode_number", episode_number);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/file/serial`,formData,{headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

export const updateFailFilm = async (film_id,{file,id},token) => {
    const formData = new FormData();
    formData.append("film_id", film_id);
    formData.append("file", file);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/file/update/${id}`,formData,{headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

export const updateFailSerial = async (film_id,{file,id,season_number,episode_number},token) => {
    const formData = new FormData();
    formData.append("film_id", film_id);
    formData.append("file", file);
    formData.append("season_number", season_number);
    formData.append("episode_number", episode_number);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/file/update/serial/${id}`,formData,{headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}

export const deleteFail= async (id,token) => {
    const response = await axios.delete(`http://localhost:80${dopPatch}/api/file/delete/${id}`,{headers: {Authorization: `Bearer ${token}`}});
    return response.data;
}