import { useState } from "react"

const useFetching = (callback, startLoader = true) => {
    const [loader,setLoader] = useState(startLoader);
    const [error,setError] = useState('');

    const fetching = async (...arr) => {
        try {
            setLoader(true);
            await callback(...arr);
        } catch (e) {
            if (e.response?.data?.errors) {
                setError(e.response.data.errors);
            }else{
                setError(e?.message)
            }
            //console.error(e);
        }finally{
            setLoader(false);
        }
    }

    return [fetching,loader,error];
}

export default useFetching;