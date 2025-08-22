import React, { useEffect, useState } from 'react'
import classes from './Authorization.module.css'
import { Link} from 'react-router'
import useFetching from '../../hooks/useFetching';
import { useDispatch } from 'react-redux';
import { login } from '../../API/user';
import { saveUser } from '../../redux/slice/userSlice';

function Authorization() {
    const dispatch=useDispatch()
    const [User,setUser] = useState({email:'',password:''});
    const [errorFields,setErrorFields] = useState({email:'',password:''})
    const [fetching,loader,error] = useFetching(async()=>{
        const res = await login(User);
        dispatch(saveUser({id:res.user.id,token:res.access_token,name:res.user.name,email:res.user.email}))
    },false)

    function loginButton(){
        let errorFront=0;
        if(User.email === undefined || User.email === null || User.email.trim() === ''){
            setErrorFields(val=>({...val,email:'The email field is required'}));
            errorFront++;
        }
        if(User.password.length<6){
            setErrorFields(val=>({...val,password:'Password must be greater than or equal to 6 characters'}));
            errorFront++;
        }

        if(errorFront==0){
            fetching();
        }
    }

    useEffect(()=>{
        setErrorFields({email:error?.email?.[0]||'',password:error?.password?.[0]||''})
    },[error])

    return (
        <div className={classes.loginBlock}>
            <form className={classes.loginForm}>
                <h1 className={classes.loginForm_title}>Вхід</h1>
                <div className={classes.loginForm_group}>
                    <label className={classes.loginForm_label} htmlFor="email" >Введи email:</label>
                    <input className={classes.loginForm_input} type="email" id='email' value={User.email} onChange={e=>{setUser(user=>({...user,email:e.target.value}));setErrorFields(val=>({...val,email:''}))}}/>
                    {errorFields.email && <p className={classes.loginForm_error}>{errorFields.email}</p>}
                </div>
                <div className={classes.loginForm_group}>
                    <label className={classes.loginForm_label} htmlFor="password">Введи пароль:</label>
                    <input className={classes.loginForm_input} type="password" id='password' value={User.password} onChange={e=>{setUser(user=>({...user,password:e.target.value}));setErrorFields(val=>({...val,password:''}))}}/>
                    {errorFields.password && <p className={classes.loginForm_error}>{errorFields.password}</p>}
                </div>
                <div className={classes.loginForm_actions}>
                    <button className={classes.loginForm_button} type='button' onClick={loginButton}>ввійти</button>
                    <Link className={classes.loginForm_link} to="/changePassword">Забули пароль</Link>
                    <Link className={classes.loginForm_link} to="/registration">Реєстрація</Link>
                </div>
            </form>
        </div>
    )
}

export default Authorization