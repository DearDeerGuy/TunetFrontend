import React from 'react'
import baner from '../../assets/baner 3.jpg';
import classes from './Form.module.css'

function Form({children}) {
  return (
    <div className={classes.form}>
        <div className={classes.backdrop}>
            <img className={classes.backdrop_img} src={baner} alt="" />
            <div className={classes.backdrop_overlay}></div>
        </div>
        <div className={classes.form_body}>
            {children}
        </div>
    </div>
  )
}

export default Form