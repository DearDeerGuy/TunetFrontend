import axios from "axios"

export const register = async ({name,email,password,repeatPassword}) => {
    const response = await axios.post('http://localhost:80/Tunet/public/api/register',null,{
        params: {
        name,
        password,
        password_confirmation: repeatPassword,
        email,
        date_of_birth: "2004-01-07"
      }
    })
    return response.data;
}

export const login = async ({email,password}) => {
    const response = await axios.post('http://localhost:80/Tunet/public/api/login',null,{
        params: {
        email,
        password,
      }
    })
    return response.data;
}