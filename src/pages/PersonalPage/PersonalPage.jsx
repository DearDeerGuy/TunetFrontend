import React, { useEffect, useRef, useState } from 'react'
import defaultAvatar from './../../assets/avatar.jpg'
import classes from './PersonalPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router';
import { clearUser, saveUser } from '../../redux/slice/userSlice';
import useFetching from '../../hooks/useFetching';
import { update } from '../../API/user';
import { activateImageULR } from '../../Utils/utils';
import Loader from '../../components/UI/Loader/Loader';
import { getTariffId } from '../../API/tariff';

function PersonalPage() {
    const dispatch = useDispatch()
    const fileInputRef = useRef();
    const user = useSelector(state => state.User);
    const [errorFields,setErrorFields] = useState({name:'',email:'',dateOfBirth:''})
    const [tariff,setTariff] = useState({id:'',name:'',description:'',})
    const [newUser,setNewUser] = useState({
        name:user.name,
        email:user.email,
        dateOfBirth:user.dateOfBirth,
        avatar:user.avatar,
        avatarFile:null,
    });
    const [fetching,loader,error] = useFetching(async()=>{
        const res = await update({...newUser,token:user.token});
        console.log(res);
        dispatch(saveUser({
            id:res.user.id,
            token:user.token,
            name:res.user.name,
            email:res.user.email,
            dateOfBirth:res.user.date_of_birth,
            avatar:activateImageULR(res.user.avatar),
            adminLvl:res.user.admin_lvl,
            tariffId:res.user.tariff_id,
            tariffEndDate:res.user.tariff_end_date,
        }))
        setNewUser((s)=>({...s,avatarFile:null}))
    },false)
    const [fetchingTariff,loaderTariff,errorTariff] = useFetching(async()=>{
        const res = await getTariffId(user.tariffId);
        setTariff(res);
    },true)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            alert("Дозволені тільки JPG, JPEG та PNG");
            return;
        }

        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            alert("Максимальний розмір файлу — 2MB");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setNewUser((val) => ({ ...val, avatar: imageUrl,avatarFile: file}));
    };

    const updateButton = () => {
        let errorFront=0;
        if(newUser.name === undefined || newUser.name === null || newUser.name.trim() === ''){
            setErrorFields(val=>({...val,name:"Поле імені обов'язкове для заповнення"}));
            errorFront++;
        }
        if(newUser.email === undefined || newUser.email === null || newUser.email.trim() === ''){
            setErrorFields(val=>({...val,email:"Поле електронної пошти обов'язкове для заповнення"}));
            errorFront++;
        }

        if(errorFront==0){
            fetching();
        }
    }

    useEffect(()=>{
        fetchingTariff();
    },[])
    useEffect(()=>{
        setErrorFields({email:error?.email?.[0]||'',password:error?.password?.[0]||'',dateOfBirth:error?.date_of_birth?.[0]||''})
    },[error])

    return (
        <div className={classes.personal}>
            <form className={classes.personal_form}>
                <div className={classes.personal_profile}>
                    <div className={classes.personal_avatarBlock}>
                        <img className={classes.personal_avatar} src={newUser.avatar||defaultAvatar} alt="avatar" onClick={()=>{fileInputRef.current.click()}}/>
                        <input className={classes.personal_fileInput} type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange}/>
                    </div>
                    <div className={classes.personal_tariff}>
                        <h1 className={classes.tariff_title}>Твій тариф</h1>
                        {loaderTariff?<>
                        <div className={classes.personal_tariffLoader}>
                            <Loader/>
                        </div>
                        </>:<>
                        <h2 className={classes.tariff_name}>{tariff.name}</h2>
                        <div className={classes.tariff_info}>{tariff.description}</div>
                        <div className={classes.tariff_date}>Закінчиться {user.tariffEndDate}</div>
                        </>}
                        <Link className={classes.tariff_button} to='/tariffs'>Змінити тариф</Link>
                    </div>
                </div>
                <div className={classes.personal_details}>
                    <div className={classes.formGroup}>
                        <label className={classes.formGroup_label} htmlFor="name">Твоє ім’я:</label>
                        <input className={classes.formGroup_input} type="text" id='name' value={newUser.name} onChange={e=>{setNewUser(user=>({...user,name:e.target.value}));setErrorFields(val=>({...val,name:''}))}}/>
                        {errorFields.name && <p className={classes.formGroup_error}>{errorFields.name}</p>}
                    </div>
                    <div className={classes.formGroup}>
                        <label className={classes.formGroup_label} htmlFor="email">Твій email:</label>
                        <input className={classes.formGroup_input} type="email" id='email' value={newUser.email} onChange={e=>{setNewUser(user=>({...user,email:e.target.value}));setErrorFields(val=>({...val,email:''}))}}/>
                        {errorFields.email && <p className={classes.formGroup_error}>{errorFields.email}</p>}
                    </div>
                    <div className={classes.formGroup}>
                        <label className={classes.formGroup_label} htmlFor="dateOfBirth">Твоя дата народження:</label>
                        <input className={classes.formGroup_input} type="date" id='dateOfBirth' value={newUser.dateOfBirth} onChange={e=>{setNewUser(user=>({...user,dateOfBirth:e.target.value}));setErrorFields(val=>({...val,dateOfBirth:''}))}}/>
                        {errorFields.dateOfBirth && <p className={classes.formGroup_error}>{errorFields.dateOfBirth}</p>}
                    </div>
                    <button type='button' className={classes.personal_button} onClick={updateButton} disabled={loader} >Зберегти зміни</button>
                    <button type='button' className={classes.personal_button} onClick={()=>{dispatch(clearUser())}}>Вийти</button>
                    {loader&&
                    <div className={classes.personal_loader}>
                        <Loader/>
                    </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default PersonalPage