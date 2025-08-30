import axios from "axios"
import { dopPatch } from "../Utils/utils";

export const register = async ({name,email,password,repeatPassword}) => {
    const response = await axios.post(`http://localhost:80${dopPatch}/api/register`,null,{
        params: {
        name,
        password,
        password_confirmation: repeatPassword,
        email,
      }
    })
    return response.data;
}

export const login = async ({email,password}) => {
    const response = await axios.post(`http://localhost:80${dopPatch}/api/login`,null,{
        params: {
        email,
        password,
      }
    })
    return response.data;
}

export const update = async ({token,name,email,dateOfBirth,avatarFile}) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('date_of_birth', dateOfBirth);
    if (avatarFile) {
        formData.append('avatar', avatarFile);
    }
    const response = await axios.post(`http://localhost:80${dopPatch}/api/profile`,
        formData,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    return response.data;
}

export const getUser = async (id) =>{
    const response = await axios.post(`http://localhost:80${dopPatch}/api/user/${id}`)
    return response.data;
}