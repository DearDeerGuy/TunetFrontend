import React, { useState } from 'react'
import classes from './AdminPanelPage.module.css'
import { useNavigate } from 'react-router';

function AdminPanelPage() {
    const navigate = useNavigate();
    const [selectFilm,setSelectFilm]=useState(null);
    return (
        <div className={classes.adminPanel}>
            <form className={classes.adminPanel_form} onSubmit={(e)=>e.preventDefault()}>
                <div className={classes.adminPanel_action}>
                    <h1 className={classes.adminPanel_actionTitle}>Admin Panel</h1>
                    <button className={classes.adminPanel_actionButton} onClick={()=>navigate('/addMovie')}>Створити</button>
                    <button className={classes.adminPanel_actionButton} disabled={!!selectFilm}>Змінити</button>
                    <button className={classes.adminPanel_actionButton} disabled={!!selectFilm}>Видалити</button>
                </div>
                <div className={classes.adminPanel_body}>
                    <div className={classes.adminPanel_search}>
                        <input className={classes.adminPanel_searchInput} type="text" />
                        <button className={classes.adminPanel_searchButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30">
                                <path fill="#000" d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
                            </svg>
                        </button>
                    </div>
                    <div className={classes.adminPanel_films}>

                    </div>
                    <div className={classes.adminPanel_controller}>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdminPanelPage