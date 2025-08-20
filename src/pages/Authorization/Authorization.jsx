import React, { useState } from 'react'
import classes from './Authorization.module.css'
import { Link} from 'react-router'

function Authorization() {
    const [User,setUser] = useState({email:'',password:''});
  return (
    <div className={classes.loginBlock}>
        <form className={classes.loginForm}>
            <h1 className={classes.loginForm_title}>Вхід</h1>
            <div className={classes.loginForm_group}>
                <label className={classes.loginForm_label} htmlFor="email" >Введи email:</label>
                <input className={classes.loginForm_input} type="email" id='email' value={User.email} onChange={e=>setUser(user=>({...user,email:e.target.value}))}/>
            </div>
            <div className={classes.loginForm_group}>
                <label className={classes.loginForm_label} htmlFor="password">Введи пароль:</label>
                <input className={classes.loginForm_input} type="password" id='password' value={User.password} onChange={e=>setUser(user=>({...user,password:e.target.value}))}/>
            </div>
            <div className={classes.loginForm_actions}>
                <button className={classes.loginForm_button} type='button'>ввійти</button>
                <Link className={classes.loginForm_link} to="/changePassword">Забули пароль</Link>
                <Link className={classes.loginForm_link} to="/registration">Реєстрація</Link>
            </div>
        </form>
    </div>
  )
}

export default Authorization