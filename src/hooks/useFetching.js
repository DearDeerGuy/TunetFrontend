import { useState } from "react"

const useFetching = (callback, startLoader = true) => {
    const [loader,setLoader] = useState(startLoader);
    const [error,setError] = useState('');

    const fetching = async () => {
        try {
            setLoader(true);
            await callback();
        } catch (e) {
            if (e.response?.data?.errors) {
                setError(e.response.data.errors);
            }
        }finally{
            setLoader(false);
        }
    }

    return [fetching,loader,error];
}

export default useFetching;