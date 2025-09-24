import React, { useEffect, useState } from 'react'
import classes from './TariffPage.module.css'
import Tariff from '../../components/UI/Tariff/Tariff'
import useFetching from '../../hooks/useFetching'
import Loader from '../../components/UI/Loader/Loader'
import { getArrTariff, setTariff } from '../../API/tariff'
import { useDispatch, useSelector } from 'react-redux'
import { saveUser } from '../../redux/slice/userSlice'

function TariffPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.User);
    const [tariffList,setTariffList] = useState([])
    const [fetching,loader,error] = useFetching(async () => {
        const res = await getArrTariff();
        setTariffList(res)
    },true)
    const [fetchingSetTariff,loaderSetTariff,errorSetTariff] = useFetching(async (tariffId) => {
        const res = await setTariff({tariffId:tariffId,token:user.token});
        dispatch(saveUser({
            tariffId:+res.user.tariff_id,
            tariffEndDate:res.user.tariff_end_date,
        }))
    },false)

    useEffect(()=>{
        fetching();
    },[])

    return (
        <div className={classes.tariffPage}>
            <form onSubmit={(e) => e.preventDefault()} className={classes.tariffPage_form}>
                <h1 className={classes.tariffPage_title}>тарифи</h1>
                {loader?<div className={classes.tariffPage_loader}><Loader/></div>:tariffList.map(val=><Tariff key={val.id} tariff={val} active={user.tariffId==val.id} onClick={()=>fetchingSetTariff(val.id)} loader={loaderSetTariff} />)}
            </form>
        </div>
    )
}

export default TariffPage