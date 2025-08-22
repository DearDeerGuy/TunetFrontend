import React, { useRef, useState } from 'react'
import defaultAvatar from './../../assets/avatar.jpg'
import classes from './PersonalPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router';
import { clearUser } from '../../redux/slice/userSlice';

function PersonalPage() {
    const dispatch = useDispatch()
    const fileInputRef = useRef();
    const user = useSelector(state => state.User);
    const [errorFields,setErrorFields] = useState({name:'',email:'',dateOfBirth:''})
    const [newUser,setNewUser] = useState({
        name:user.name,
        email:user.email,
        dateOfBirth:user.dateOfBirth,
        avatar:user.avatar,
    });

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
        setNewUser((val) => ({ ...val, avatar: imageUrl }));
    };

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
                        <h2 className={classes.tariff_name}>Family</h2>
                        <div className={classes.tariff_info}>10 000 фільмів та серіалів</div>
                        <div className={classes.tariff_date}>Закінчиться 1 жовтня 2025</div>
                        <Link className={classes.tariff_button} to='/main'>Змінити тариф</Link>
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
                    <button type='button' className={classes.personal_button}>Зберегти зміни</button>
                    <button type='button' className={classes.personal_button} onClick={()=>{dispatch(clearUser())}}>Вийти</button>
                </div>
            </form>
        </div>
    )
}

export default PersonalPage