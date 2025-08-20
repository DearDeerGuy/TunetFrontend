import React, { useState } from 'react'
import classes from './Registration.module.css'

function Registration() {
    const [User,setUser] = useState({name:'',email:'',password:'',repeatPassword:''})
    return (
        <div className={classes.regBlock}>
            <form className={classes.regForm}>
                <h1 className={classes.regForm_title}>Реєстрація</h1>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="name" >Введи  ім’я:</label>
                    <input className={classes.regForm_input} type="text" id='name' value={User.name} onChange={e=>setUser(user=>({...user,name:e.target.value}))}/>
                </div>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="email" >Введи email:</label>
                    <input className={classes.regForm_input} type="email" id='email' value={User.email} onChange={e=>setUser(user=>({...user,email:e.target.value}))}/>
                </div>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="password" >Введи пароль:</label>
                    <input className={classes.regForm_input} type="password" id='password' value={User.email} onChange={e=>setUser(user=>({...user,password:e.target.value}))}/>
                </div>
                <div className={classes.regForm_group}>
                    <label className={classes.regForm_label} htmlFor="repeatPassword" >Повтори пароль:</label>
                    <input className={classes.regForm_input} type="password" id='repeatPassword' value={User.email} onChange={e=>setUser(user=>({...user,repeatPassword:e.target.value}))}/>
                </div>
                <button className={classes.regForm_button} type='button'>Зареєструватись</button>
            </form>
        </div>
    )
}

export default Registration