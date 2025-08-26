import React, { useEffect, useState } from 'react'
import classes from './Registration.module.css'
import {register} from '../../API/user'
import useFetching from '../../hooks/useFetching'
import { useDispatch } from 'react-redux'
import { saveUser } from '../../redux/slice/userSlice'

function Registration() {
    const dispatch = useDispatch()
    const [errorFields, setErrorFields] = useState({name:'',email:'',password:'',repeatPassword:''})
    const [User,setUser] = useState({name:'',email:'',password:'',repeatPassword:''})
    const [fetching,loader,error] = useFetching(async()=>{
        const res = await register(User);
        dispatch(saveUser({id:res.user.id,token:res.access_token,name:res.user.name,email:res.user.email}))
    },false);

    function registerButton(){
        let errorFront=0;
        if(User.name === undefined || User.name === null || User.name.trim() === ''){
            setErrorFields(val=>({...val,name:"Поле імені обов'язкове для заповнення"}));
            errorFront++;
        }
        if(User.email === undefined || User.email === null || User.email.trim() === ''){
            setErrorFields(val=>({...val,email:"Поле електронної пошти обов'язкове для заповнення"}));
            errorFront++;
        }
        if(User.password.length<6){
            setErrorFields(val=>({...val,password:'Пароль має бути більше або дорівнювати 6 символам'}));
            errorFront++;
        }
        if(User.password!==User.repeatPassword){
            setErrorFields(val=>({...val,repeatPassword:'Ви неправильно повторили пароль'}));
            errorFront++;
        }

        if(errorFront==0){
            fetching();
        }
    }

    useEffect(()=>{
        setErrorFields({name:error?.name?.[0]||'',email:error?.email?.[0]||'',password:error?.password?.[0]||'',repeatPassword:error?.repeatPassword?.[0]||''})
    },[error])
    
    return (
        <div className={classes.regBlock}>
            <form className={classes.regForm}>
                <h1 className={classes.regForm_title}>Реєстрація</h1>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="name" >Введи  ім’я:</label>
                    <input className={classes.regForm_input} type="text" id='name' value={User.name} onChange={e=>{setUser(user=>({...user,name:e.target.value}));setErrorFields(val=>({...val,name:''}))}}/>
                    {errorFields.name && <p className={classes.regForm_error}>{errorFields.name}</p>}
                </div>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="email" >Введи email:</label>
                    <input className={classes.regForm_input} type="email" id='email' value={User.email} onChange={e=>{setUser(user=>({...user,email:e.target.value}));setErrorFields(val=>({...val,email:''}))}}/>
                    {errorFields.email && <p className={classes.regForm_error}>{errorFields.email}</p>}
                </div>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="password" >Введи пароль:</label>
                    <input className={classes.regForm_input} type="password" id='password' value={User.password} onChange={e=>{setUser(user=>({...user,password:e.target.value}));setErrorFields(val=>({...val,password:''}))}}/>
                    {errorFields.password && <p className={classes.regForm_error}>{errorFields.password}</p>}
                </div>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="repeatPassword" >Повтори пароль:</label>
                    <input className={classes.regForm_input} type="password" id='repeatPassword' value={User.repeatPassword} onChange={e=>{setUser(user=>({...user,repeatPassword:e.target.value}));setErrorFields(val=>({...val,repeatPassword:''}))}}/>
                    {errorFields.repeatPassword && <p className={classes.regForm_error}>{errorFields.repeatPassword}</p>}
                </div>
                <button className={classes.regForm_button} type='button' onClick={registerButton} >Зареєструватись</button>
            </form>
        </div>
    )
}

export default Registration