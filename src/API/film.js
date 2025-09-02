export const AddMovie = async({posterFile,title,description,release_date,type,actors,producer,country,category}) =>{
    const formData = new FormData();
    formData.append("poster", poster);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("release_date", release_date);
    formData.append("type", type);
    formData.append("actors", actors);
    formData.append("producer", producer);
    formData.append("country", country);
    formData.append("category", category);
    const response = await axios.post(`http://localhost:80${dopPatch}/api/settariff`,formData,{headers: {Authorization: `Bearer ${token}`}})
    return response.data;
}