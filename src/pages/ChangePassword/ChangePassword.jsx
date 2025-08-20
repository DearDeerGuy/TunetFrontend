import React, { useState } from 'react'
import classes from './ChangePassword.module.css'
import { useNavigate } from 'react-router';

function ChangePassword() {
    const navigate = useNavigate();
    const [index,setIndex] = useState(1);
    return (
        <div className={classes.changePassword}>
            {index === 1 && <form className={classes.form}>
                <h1 className={classes.form_title}>Зміна паролю</h1>
                <div className={classes.form_block}>
                    <div className={classes.form_text}>Введіть адресу ел.пошти</div>
                    <div className={classes.inputGroup}>
                        <label className={classes.inputGroup_label} htmlFor="email">Введи email</label>
                        <input className={classes.inputGroup_input} type="email" id='email' />
                    </div>
                    <button className={classes.button} type='button' onClick={()=>setIndex(2)}>Надіслати мені листа</button>
                </div>
            </form>}
            {index === 2 && <form className={classes.form}>
                <div className={classes.form_text}>Введіть код який був відправлений вам на ел.пошту</div>
                <div className={classes.form_block}>
                    <div className={classes.inputGroup}>
                        <label className={classes.inputGroup_label} htmlFor="code">Введи код:</label>
                        <input className={classes.inputGroup_input} type="code" id='code' />
                    </div>
                    <button className={classes.button} type='button' onClick={()=>setIndex(3)}>Підтвердити код</button>
                </div>
            </form>}
            {index === 3 && <form className={classes.form}>
                <h1 className={classes.form_title}>Зміна паролю</h1>
                <div className={classes.form_block}>
                    <div className={classes.inputGroup}>
                        <label className={classes.inputGroup_label} htmlFor="password">Введи пароль:</label>
                        <input className={classes.inputGroup_input} type="password" id='password' />
                    </div>
                    <div className={classes.inputGroup}>
                        <label className={classes.inputGroup_label} htmlFor="repeatPassword">Повтори пароль:</label>
                        <input className={classes.inputGroup_input} type="password" id='repeatPassword' />
                    </div>
                    <button className={classes.button} type='button' onClick={()=>navigate('/main')}>Підтвердити код</button>
                </div>
            </form>}
        </div>
    )
}

export default ChangePassword