import React, { useEffect, useState } from 'react'
import classes from './ResetPassword.module.css'
import { useLocation, useNavigate } from 'react-router';
import useFetching from '../../hooks/useFetching';
import { restorePassword, sendLetter } from '../../API/user';

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const stage = (queryParams.get("token")!=null&&queryParams.get("email")!=null)?2:1;
    const [email,setEmail] = useState('');
    const [errorFields,setErrorFields] = useState({email:'',password:'',repeatPassword:''});
    const [passwords,setPasswords] = useState({password:'',repeatPassword:''});
    const [fetchingSendLetter,loaderSendLetter,errorSendLetter] = useFetching(async()=>{
        const res = await sendLetter(email);
        navigate('/main');
    },false);
    const [fetchingRestorePassword,loaderRestorePassword,errorRestorePassword] = useFetching(async()=>{
        const res = await restorePassword({email:queryParams.get("email"),token:queryParams.get("token"),password:passwords.password,password_confirmation:passwords.repeatPassword});
        navigate('/main');
    },false)

    function emailButton(){
        let errorFront=0;
        if(email === undefined || email === null || email.trim() === ''){
            setErrorFields(val=>({...val,email:"Поле електронної пошти обов'язкове для заповнення"}));
            errorFront++;
        }
        if(errorFront==0){
            fetchingSendLetter();
        }
    }
    function passwordsButton(){
        let errorFront=0;
        if(passwords.password.length<6){
            setErrorFields(val=>({...val,password:'Пароль має бути більше або дорівнювати 6 символам'}));
            errorFront++;
        }
        if(passwords.password!==passwords.repeatPassword){
            setErrorFields(val=>({...val,repeatPassword:'Ви неправильно повторили пароль'}));
            errorFront++;
        }
        if(errorFront==0){
            fetchingRestorePassword();
        }
    }

    useEffect(()=>{
        setErrorFields({email:errorSendLetter?.email?.[0]||'',password:errorRestorePassword?.password?.[0]||'',repeatPassword:errorRestorePassword?.password_confirmation?.[0]||''})
    },[errorSendLetter,errorRestorePassword])

    return (
        <div className={classes.changePassword}>
            {stage === 1 && <form className={classes.form} onSubmit={(e)=>e.preventDefault()}>
                <h1 className={classes.form_title}>Зміна паролю</h1>
                <div className={classes.form_block}>
                <div className={classes.form_text}>Введіть адресу ел.пошти</div>
                <div className={classes.inputGroup}>
                    <label className={classes.inputGroup_label} htmlFor="email">Введи email</label>
                    <input className={classes.inputGroup_input} type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {errorFields.email && <p className={classes.inputGroup_error}>{errorFields.email}</p>}
                </div>
                <button className={classes.button} type='button' disabled={loaderSendLetter} onClick={emailButton}>Надіслати мені листа</button>
                </div>
            </form>}
            {stage === 2 && <form className={classes.form} onSubmit={(e)=>e.preventDefault()}>
                <h1 className={classes.form_title}>Зміна паролю</h1>
                <div className={classes.form_block}>
                    <div className={classes.inputGroup}>
                        <label className={classes.inputGroup_label} htmlFor="password">Введи пароль:</label>
                        <input className={classes.inputGroup_input} type="password" id='password' value={passwords.password} onChange={(e)=>setPasswords(s=>({...s,password:e.target.value}))} />
                        {errorFields.password && <p className={classes.inputGroup_error}>{errorFields.password}</p>}
                    </div>
                    <div className={classes.inputGroup}>
                        <label className={classes.inputGroup_label} htmlFor="repeatPassword">Повтори пароль:</label>
                        <input className={classes.inputGroup_input} type="password" id='repeatPassword' value={passwords.repeatPassword} onChange={(e)=>setPasswords(s=>({...s,repeatPassword:e.target.value}))} />
                        {errorFields.repeatPassword && <p className={classes.inputGroup_error}>{errorFields.repeatPassword}</p>}
                    </div>
                    <button className={classes.button} type='button' disabled={loaderRestorePassword} onClick={passwordsButton}>Зміна паролю</button>
                </div>
            </form>}
        </div>
    )
}

export default ResetPassword