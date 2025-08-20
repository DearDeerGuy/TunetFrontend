import { useState } from "react"

export const useFetching = (callback, startLoader = true) => {
    const [loader,setLoader] = useState(startLoader);
    const [error,setError] = useState('');

    const fetching = async () => {
        try {
            setLoader(true);
            await callback();
        } catch (e) {
            setError(e.message);
        }finally{
            setLoader(false);
        }
    }

    return [fetching,loader,error];
}
