import React from 'react'
import classes from './Tariff.module.css'
import { activateImageULR } from '../../../Utils/utils'

function Tariff({tariff,active=false,onClick,loader}) {

    return (
        <div className={[classes.tariff, active&&classes.tariffActive].join(' , ')}>
            <img className={classes.tariff_image} src={`http://localhost/Tunet/public/storage/${tariff.image}`} alt="Tariff" />
            <div className={classes.tariff_body}>
                <h2 className={classes.tariff_title}>{tariff.name}</h2>
                <div className={classes.tariff_description}>{tariff.description}</div>
                <div className={classes.tariff_info}>
                    <div className={classes.tariff_price}>Ціна: {tariff.price} грн.</div>
                    <div className={classes.tariff_months}>Термін тарифу: {tariff.duration_months} місяців.</div>
                </div>
                <button className={classes.tariff_button} disabled={loader} onClick={()=>onClick()}><b>Обрати</b></button>
            </div>
        </div>
    )
}

export default Tariff